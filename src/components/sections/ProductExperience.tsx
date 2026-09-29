import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneFrame } from '../phone/PhoneFrame';
import { BrandMark } from '../ui/BrandMark';
import { Icon } from '../ui/Icon';
import { chapters } from '../../lib/content';
import { primaryCta, site } from '../../config/site';
import { track } from '../../lib/analytics';

gsap.registerPlugin(ScrollTrigger);
export default function ProductExperience() {
  const root = useRef<HTMLElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [format, setFormat] = useState(0);
  const reduced = useRef(false);
  const trigger = useRef<ScrollTrigger | null>(null);
  const milestones = useRef(new Set<string>());
  useEffect(() => {
    if (!root.current || !phone.current) return;
    const media = gsap.matchMedia();
    const element = root.current;
    media.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 768px)',
      },
      (context) => {
        reduced.current = !!context.conditions?.reduce;
        if (reduced.current) {
          gsap.set(phone.current, { clearProps: 'all' });
          return;
        }
        const mobile = !!context.conditions?.mobile;
        trigger.current = ScrollTrigger.create({
          trigger: element,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const value = self.progress * 9;
            const current = Math.min(8, Math.floor(value));
            const local = value - current;
            setStage(current);
            if (current === 3) setFormat(Math.min(4, Math.floor(local * 5)));
            element.style.setProperty('--story-progress', String(self.progress));
            element.style.setProperty(
              '--feed-offset',
              String(current === 2 ? Math.min(1, local / 0.82) * 1172 : 0),
            );
            element.style.setProperty('--scene-progress', String(local));
            const intro = Math.min(1, self.progress * 10);
            gsap.set(phone.current, {
              x: mobile ? 0 : -70 * intro,
              y: mobile ? 0 : 18 * (1 - intro),
              rotation: mobile ? 0 : 5 * (1 - intro),
              scale: current === 8 ? 0.93 : 1,
            });
            if (current >= 1 && !milestones.current.has('start')) {
              milestones.current.add('start');
              track('scroll_demo_started');
            }
            if (current === 8 && !milestones.current.has('end')) {
              milestones.current.add('end');
              track('scroll_demo_completed');
            }
          },
        });
        return () => {
          trigger.current?.kill();
          trigger.current = null;
        };
      },
    );
    const resize = new ResizeObserver(() => ScrollTrigger.refresh());
    resize.observe(element);
    return () => {
      resize.disconnect();
      media.revert();
    };
  }, []);
  function goTo(index: number) {
    if (reduced.current || !trigger.current) {
      setStage(index);
      if (index === 3) setFormat((format + 1) % 5);
      return;
    }
    const scrollTo =
      trigger.current.start + (trigger.current.end - trigger.current.start) * ((index + 0.12) / 9);
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  }
  const chapter = chapters[stage];
  return (
    <section
      className="experience"
      id="product"
      ref={root}
      data-stage={stage}
      aria-label="Explore Wyllex"
    >
      <div className="experience-sticky">
        <div className="hero-glow" />
        <div className="brand-landscape" aria-hidden="true">
          <BrandMark size={900} />
          <div className="landscape-line" />
        </div>
        <div className="experience-inner">
          <div className="story-copy" key={stage}>
            <div className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {chapter.eyebrow}
            </div>
            {stage !== 0 && <h1 className="sr-only">Wyllex — Law worth scrolling</h1>}
            {stage === 0 ? (
              <h1>
                Law worth
                <br />
                <span>scrolling.</span>
              </h1>
            ) : (
              <h2>{chapter.title}</h2>
            )}
            <p>{chapter.description}</p>
            {stage === 0 || stage === 8 ? (
              <>
                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href={primaryCta.href}
                    onClick={() => stage === 0 && track('hero_cta_clicked')}
                  >
                    {stage === 8 && !primaryCta.href.startsWith('http')
                      ? 'Join Wyllex'
                      : primaryCta.label}
                    <span className="button-orbit">
                      <Icon name="plus" size={16} />
                    </span>
                  </a>
                  {stage === 0 && (
                    <button className="text-button" onClick={() => goTo(1)}>
                      <span className="play-circle">
                        <Icon name="play" size={10} />
                      </span>
                      See how it works
                    </button>
                  )}
                </div>
                <div className="iphone-context">
                  <Icon name="apple" size={18} />
                  <span>{site.appStoreUrl ? 'Available on iPhone.' : 'Coming to iPhone.'}</span>
                  <span className="context-divider" />
                  <span>Made for Law students.</span>
                </div>
              </>
            ) : (
              <div className="chapter-detail">
                <span>0{stage}</span>
                <div />
                <span>{chapter.label}</span>
              </div>
            )}
            {stage === 3 && (
              <div className="format-tags">
                {['Explainer', 'Animation', 'Case story', 'Diagram', 'Recap'].map((name, i) => (
                  <span key={name} className={format === i ? 'active' : ''}>
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="phone-stage">
            <div className="phone-motion" ref={phone}>
              <div className="phone-halo" />
              <PhoneFrame stage={stage} format={format} />
              <div
                className={`floating-note note-one ${stage === 0 || stage === 8 ? 'visible' : ''}`}
              >
                <span className="note-icon">
                  <Icon name="layers" size={20} />
                </span>
                <div>
                  <span>FROM YOUR COURSE</span>
                  <strong>Straight to your feed.</strong>
                </div>
              </div>
              <div className={`floating-note note-two ${stage === 0 ? 'visible' : ''}`}>
                <span className="note-icon lavender">
                  <Icon name="book" size={19} />
                </span>
                <div>
                  <strong>Watch. Tap Study. Remember.</strong>
                  <span>A summary and a quick check.</span>
                </div>
              </div>
              {stage === 8 && (
                <div className="ecosystem-tags">
                  <span>
                    <Icon name="book" size={15} />
                    Modules
                  </span>
                  <span>
                    <Icon name="bookmark" size={15} />
                    Your library
                  </span>
                  <span>
                    <Icon name="spark" size={15} />
                    Quizzes
                  </span>
                  <span>
                    <Icon name="focus" size={15} />
                    Focus
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="story-side" aria-hidden="true">
            <span className="side-label">A NEW WAY TO KNOW LAW</span>
            <div className="side-line" />
            <span className="side-count">
              0{stage + 1} <i>/ 09</i>
            </span>
          </div>
        </div>
        <div className="experience-bottom">
          <div className="scroll-prompt">
            <span className="scroll-mouse">
              <i />
            </span>
            <span>{stage === 0 ? 'SCROLL TO GET IT' : 'KEEP EXPLORING'}</span>
          </div>
          <nav className="chapter-nav" aria-label="Product chapters">
            {chapters.map((item, i) => (
              <button
                key={item.label}
                aria-label={item.label}
                aria-current={stage === i ? 'step' : undefined}
                onClick={() => goTo(i)}
              >
                <span />
                {stage === i && <span className="chapter-tooltip">{item.label}</span>}
              </button>
            ))}
          </nav>
          <span className="demo-disclaimer">A look inside Wyllex · Illustrative app preview</span>
        </div>
        <div className="demo-progress" aria-hidden="true" />
      </div>
      <div className="sr-only">
        <h2>The Wyllex experience</h2>
        {chapters.slice(1).map((c) => (
          <div key={c.label}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
      <noscript>
        <div className="no-script-story">
          {chapters.slice(1).map((c) => (
            <article key={c.label}>
              <h2>{c.title}</h2>
              <p>{c.description}</p>
            </article>
          ))}
        </div>
      </noscript>
    </section>
  );
}
