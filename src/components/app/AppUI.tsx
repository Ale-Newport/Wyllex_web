import { BrandMark } from '../ui/BrandMark';
import { OfferScene } from './OfferScene';
import { Icon, type IconName } from '../ui/Icon';

export function BottomNavigation({ active = 'Reels' }: { active?: string }) {
  return (
    <div className="app-nav">
      {(
        [
          ['Reels', 'play'],
          ['Modules', 'book'],
          ['Create', 'plus'],
          ['Library', 'grid'],
          ['More', 'menu'],
        ] as [string, IconName][]
      ).map(([label, icon]) => (
        <div className={label === active ? 'selected' : ''} key={label}>
          <Icon name={icon} size={19} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
export function ModuleBadge({ children }: { children: React.ReactNode }) {
  return <span className="module-badge">{children}</span>;
}
export function VideoCaption({
  title,
  module,
  part,
}: {
  title: string;
  module: string;
  part: string;
}) {
  return (
    <div className="video-caption">
      <div className="presenter">
        <span className="mini-mark">
          <BrandMark size={19} />
        </span>
        <strong>Wyllex</strong>
        <span className="verified">✓</span>
        <span>· {part}</span>
      </div>
      <h3>{title}</h3>
      <p>
        <ModuleBadge>{module}</ModuleBadge>
        <span>Made to make sense.</span>
      </p>
    </div>
  );
}

export function CaseArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`case-art ${compact ? 'compact' : ''}`}
      viewBox="0 0 340 390"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={compact ? 'bottle-small' : 'bottle'}
          x1="105"
          y1="70"
          x2="243"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#768b41" />
          <stop offset="1" stopColor="#324224" />
        </linearGradient>
      </defs>
      <ellipse cx="174" cy="343" rx="115" ry="15" fill="#354028" opacity=".13" />
      <g transform="rotate(14 185 205)">
        <path
          d="M139 44h58v71c0 22 33 38 33 60v138c0 13-9 20-21 20h-82c-12 0-21-7-21-20V175c0-22 33-38 33-60V44Z"
          fill={`url(#${compact ? 'bottle-small' : 'bottle'})`}
          stroke="#354329"
          strokeWidth="2"
        />
        <path d="M140 58h55M139 68h57" stroke="#a2b374" strokeWidth="3" opacity=".6" />
        <rect
          x="135"
          y="34"
          width="65"
          height="20"
          rx="5"
          fill="#d8a956"
          stroke="#a27739"
          strokeWidth="2"
        />
        <path d="M120 180h96v106h-96z" fill="#f3eedc" />
        <path d="M125 186h86v94h-86z" stroke="#b7ba95" />
        <text
          x="168"
          y="210"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="3"
          fill="#505c33"
          fontFamily="Georgia, serif"
        >
          THE ORIGINAL
        </text>
        <text
          x="168"
          y="237"
          textAnchor="middle"
          fontSize="24"
          fill="#354329"
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          Ginger
        </text>
        <text
          x="168"
          y="260"
          textAnchor="middle"
          fontSize="22"
          fill="#354329"
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          Beer
        </text>
        <path
          d="M125 158c6-18 25-27 25-45V80"
          stroke="#bdc991"
          strokeWidth="7"
          strokeLinecap="round"
          opacity=".32"
        />
      </g>
      <g className="snail" transform="translate(41 245) rotate(-10)">
        <path
          d="M5 73c2-12 28-18 47-18h49l20-26 4 5-9 35c-15 15-74 20-107 13-5-1-7-5-4-9Z"
          fill="#e7ae63"
          stroke="#694d31"
          strokeWidth="2"
        />
        <circle cx="60" cy="45" r="35" fill="#bd753f" stroke="#694d31" strokeWidth="2" />
        <path
          d="M61 68c-29 0-33-37-11-45 25-10 40 23 21 31-12 5-22-7-14-14 5-4 12 1 8 6"
          stroke="#edbc7e"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="m119 33 4-15m-3 20 13-11" stroke="#694d31" strokeWidth="2" />
        <circle cx="123" cy="17" r="3" fill="#694d31" />
        <circle cx="134" cy="26" r="3" fill="#694d31" />
      </g>
      <path
        d="M42 99c-9 14-10 33-2 46m-9-37c-6 12-6 22-2 32M280 244l14-6m-17-4 8-10"
        stroke="#5a6841"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="269" cy="102" r="22" stroke="#768344" strokeDasharray="3 4" />
      <path d="m262 101 5 6 10-12" stroke="#5a6841" strokeWidth="2" />
    </svg>
  );
}
function MindArtwork() {
  return (
    <div className="mind-art">
      <span className="orbit orbit-one" />
      <span className="orbit orbit-two" />
      <div className="mind-core">
        <Icon name="spark" size={56} />
      </div>
      <span className="concept-chip intent">Intention</span>
      <span className="concept-chip reckless">Recklessness</span>
      <span className="concept-chip knowledge">Knowledge</span>
      <span className="diagram-note">The mental element.</span>
    </div>
  );
}
function ContractArtwork() {
  return (
    <div className="contract-art">
      <div className="promise-card">
        <span>01</span>
        <h4>
          “I’ll sell it
          <br />
          for £100.”
        </h4>
        <p>A clear offer.</p>
        <Icon name="check" />
      </div>
      <div className="promise-card accepted">
        <span>02</span>
        <h4>
          “You’ve got
          <br />a deal.”
        </h4>
        <p>An acceptance.</p>
        <Icon name="check" />
      </div>
      <span className="contract-line" />
      <span className="contract-equals">An agreement.</span>
    </div>
  );
}
export function FeedVideo({
  type = 'offer',
  format = 'CASE STORY',
}: {
  type?: 'case' | 'mind' | 'contract' | 'offer';
  format?: string;
}) {
  const data =
    type === 'offer'
      ? {
          headline: (
            <>
              An offer.
              <br />
              <em>Not yet a deal.</em>
            </>
          ),
          title: 'When is an offer communicated?',
          module: 'Contract Law',
          time: '0:08 / 0:45',
        }
      : type === 'case'
        ? {
            headline: (
              <>
                It started
                <br />
                with a <em>snail.</em>
              </>
            ),
            title: 'Donoghue v Stevenson',
            module: 'Tort Law',
            time: '0:18 / 1:02',
          }
        : type === 'mind'
          ? {
              headline: (
                <>
                  A guilty act needs
                  <br />a <em>guilty mind.</em>
                </>
              ),
              title: 'Mens rea in 60 seconds',
              module: 'Criminal Law',
              time: '0:12 / 1:00',
            }
          : {
              headline: (
                <>
                  A promise.
                  <br />
                  Or a <em>contract?</em>
                </>
              ),
              title: 'Offer vs invitation to treat',
              module: 'Contract Law',
              time: '0:08 / 0:54',
            };
  return (
    <div className={`feed-video video-${type}`}>
      <div className="video-top">
        <span>
          <span className="feed-tab">Following</span> For you
        </span>
        <Icon name="grid" size={19} />
      </div>
      <div className="format-label">
        <span /> {type === 'offer' ? 'ANIMATED STORY' : format}
      </div>
      <h2 className="video-headline">{data.headline}</h2>
      {type === 'offer' ? (
        <OfferScene />
      ) : type === 'case' ? (
        <CaseArtwork />
      ) : type === 'mind' ? (
        <MindArtwork />
      ) : (
        <ContractArtwork />
      )}
      <div className="video-subtitle">
        {type === 'offer' ? (
          <>
            <mark>Received doesn’t mean accepted.</mark>
          </>
        ) : type === 'case' ? (
          <>
            A small discovery.
            <br />
            <mark>A big duty of care.</mark>
          </>
        ) : type === 'mind' ? (
          <>
            <mark>What was the defendant thinking?</mark>
          </>
        ) : (
          <>
            <mark>So when does a deal become binding?</mark>
          </>
        )}
      </div>
      <div className="video-actions">
        <span>
          <Icon name="heart" size={23} />
          Like
        </span>
        <span>
          <Icon name="book" size={22} />
          Study
        </span>
        <span>
          <Icon name="share" size={21} />
          Share
        </span>
      </div>
      <VideoCaption
        title={data.title}
        module={data.module}
        part={type === 'offer' ? '45-second Law' : '60-second Law'}
      />
      <div className="video-time">
        <span>
          <Icon name="play" size={9} />
          {data.time}
        </span>
        <span>CC</span>
      </div>
      <div className="video-progress">
        <i />
      </div>
    </div>
  );
}
export function SubjectSelector() {
  return (
    <div className="app-page subjects-screen">
      <div className="app-wordmark">
        <BrandMark size={26} />
        <span>Modules</span>
      </div>
      <span className="app-kicker">YOUR DEGREE, IN ONE PLACE</span>
      <h2>
        Your course.
        <br />
        Your starting point.
      </h2>
      <p>
        LLB Law · Year 1<br />
        Choose the modules you’re studying.
      </p>
      <div className="subject-options">
        {[
          ['Criminal Law', 'CR', '#dfb09a'],
          ['Contract Law', 'CO', '#d8c5d6'],
          ['Tort Law', 'TO', '#b8e3ce'],
          ['Constitutional Law', 'PU', '#b5cad7'],
          ['EU Law', 'EU', '#f4d78b'],
        ].map(([name, short, color], i) => (
          <div
            className="subject-option"
            key={name}
            style={{ '--order': i } as React.CSSProperties}
          >
            <span style={{ background: color }}>{short}</span>
            <strong>{name}</strong>
            <i>
              <Icon name="check" size={13} />
            </i>
          </div>
        ))}
      </div>
      <div className="app-button">
        Build my feed <Icon name="spark" size={17} />
      </div>
      <span className="app-footnote">Your degree. Your pace.</span>
    </div>
  );
}
export function FormatScreen({ format }: { format: number }) {
  const names = ['THE EXPLAINER', 'ANIMATED CONCEPT', 'CASE STORY', 'THE BREAKDOWN', 'RAPID RECAP'];
  if (format === 2)
    return (
      <div className="feed-track">
        <FeedVideo type="offer" format={names[format]} />
      </div>
    );
  return (
    <div className={`format-screen format-${format}`}>
      <div className="video-top">
        <span>
          <span className="feed-tab">Following</span> For you
        </span>
        <Icon name="grid" size={19} />
      </div>
      <div className="format-label">
        <span />
        {names[format]}
      </div>
      <h2 className="video-headline">
        {format === 0 ? (
          <>
            Let’s talk
            <br />
            <em>consideration.</em>
          </>
        ) : format === 1 ? (
          <>
            Connect
            <br />
            the <em>concepts.</em>
          </>
        ) : format === 3 ? (
          <>
            Negligence.
            <br />
            <em>Broken down.</em>
          </>
        ) : (
          <>
            Five principles.
            <br />
            <em>One minute.</em>
          </>
        )}
      </h2>
      {format === 0 ? (
        <div className="avatar-art">
          <svg viewBox="0 0 260 250" aria-hidden="true">
            <ellipse cx="130" cy="237" rx="100" ry="12" fill="#a17463" opacity=".2" />
            <path d="M40 235c0-60 35-84 90-84s90 24 90 84" fill="#516246" />
            <path d="M110 140h40v35c-13 18-27 18-40 0" fill="#bf8364" />
            <ellipse cx="130" cy="99" rx="53" ry="61" fill="#d49a78" />
            <path
              d="M77 106c-16-53 7-85 48-85 51 0 70 35 56 86l-16-29c-29 4-54-5-59-17-3 19-15 30-29 45"
              fill="#33251e"
            />
            <path d="M108 112h1m42 0h1" stroke="#33251e" strokeWidth="7" strokeLinecap="round" />
            <path d="M120 140q11 9 22-1" stroke="#854e3b" strokeWidth="3" fill="none" />
            <rect
              x="91"
              y="99"
              width="33"
              height="23"
              rx="9"
              fill="none"
              stroke="#484036"
              strokeWidth="3"
            />
            <rect
              x="139"
              y="99"
              width="33"
              height="23"
              rx="9"
              fill="none"
              stroke="#484036"
              strokeWidth="3"
            />
            <path d="M124 107h15" stroke="#484036" strokeWidth="3" />
            <path d="M175 205h16v22h-16z" fill="#b8e3ce" />
          </svg>
          <div className="speech-label">
            “Something of value,
            <br />
            given in exchange.”
          </div>
        </div>
      ) : format === 1 ? (
        <MindArtwork />
      ) : format === 3 ? (
        <div className="negligence-diagram">
          {['Duty of care', 'Breach of duty', 'Causation', 'Actionable damage'].map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              {s}
              <Icon name="check" size={17} />
            </div>
          ))}
        </div>
      ) : (
        <div className="recap-art">
          <strong>
            01<span>/05</span>
          </strong>
          <h3>Precedent</h3>
          <p>
            Like cases.
            <br />
            Like decisions.
          </p>
          <div>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
      <div className="format-bottom">
        <span className="mini-mark">
          <BrandMark size={19} />
        </span>
        <strong>
          {format === 0
            ? 'Consideration explained'
            : format === 1
              ? 'The elements of a crime'
              : format === 3
                ? 'The negligence checklist'
                : 'Judicial precedent: a recap'}
        </strong>
        <ModuleBadge>
          {format === 0
            ? 'Contract Law'
            : format === 1
              ? 'Criminal Law'
              : format === 3
                ? 'Tort Law'
                : 'Legal Methods'}
        </ModuleBadge>
      </div>
    </div>
  );
}
export function QuizCard() {
  return (
    <div className="quiz-card">
      <div className="quiz-meta">
        <Icon name="spark" size={16} />
        <span>QUICK CHECK</span>
        <span>1 / 3</span>
      </div>
      <h3>
        Who is your “neighbour”
        <br />
        in the legal sense?
      </h3>
      <div className="quiz-answer">Anyone living nearby</div>
      <div className="quiz-answer correct">
        People closely and directly
        <br />
        affected by your actions <Icon name="check" size={18} />
      </div>
      <div className="quiz-answer">Only people you know</div>
      <div className="quiz-feedback">
        <Icon name="check" size={16} />
        Exactly. It’s about foreseeability.
      </div>
    </div>
  );
}
export function KnowledgeScreen() {
  return (
    <div className="app-page knowledge-screen">
      <div className="app-section-title">
        <Icon name="bookmark" />
        Study aid
      </div>
      <span className="app-kicker">SUMMARY · KEY TAKEAWAYS · QUIZ</span>
      <h2>Make it stick.</h2>
      <div className="case-summary">
        <span>TORT LAW · CASE NOTE</span>
        <h3>
          Donoghue v<br />
          Stevenson <small>[1932]</small>
        </h3>
        <p>The neighbour principle.</p>
        <div>Take reasonable care to avoid harm to those closely affected by what you do.</div>
        <Icon name="bookmark" size={20} />
      </div>
      <QuizCard />
      <div className="xp-pill">
        <Icon name="spark" size={14} /> Saved to your learning library
      </div>
    </div>
  );
}
export function CreateReelScreen() {
  return (
    <div className="app-page creation-screen">
      <div className="app-section-title">
        <Icon name="plus" />
        Create a reel
      </div>
      <h2>
        A topic.
        <br />A fresh perspective.
      </h2>
      <p>Start with what you’re studying.</p>
      <div className="creation-tabs">
        <span>Topic</span>
        <span className="active">My notes</span>
        <span>Script</span>
      </div>
      <div className="notes-document">
        <div>
          <Icon name="document" size={18} />
          <span>
            Contract_Law_Week_3.pdf<small>Added to your notes</small>
          </span>
          <Icon name="check" size={15} />
        </div>
        <h3>Offer & acceptance</h3>
        <p>
          An offer must be communicated.
          <br />
          Acceptance is a separate step.
        </p>
        <i />
        <i />
        <i />
      </div>
      <span className="app-kicker">CHOOSE HOW TO SEE IT</span>
      <div className="creation-modes">
        {(
          [
            ['Avatar', 'user'],
            ['Animation', 'layers'],
            ['Story', 'book'],
            ['Mixed', 'grid'],
          ] as [string, IconName][]
        ).map(([label, icon]) => (
          <div className={label === 'Story' ? 'selected' : ''} key={label}>
            <Icon name={icon} size={18} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="creation-settings">
        <span>English</span>
        <span>45 seconds</span>
        <span>Vertical</span>
      </div>
      <div className="app-button">
        <Icon name="play" size={15} />
        Create my reel
      </div>
      <span className="app-footnote">Your material. A different way to understand it.</span>
    </div>
  );
}
export function FocusMode() {
  return (
    <div className="app-page focus-screen">
      <div className="app-section-title">
        <Icon name="focus" />A moment for you
      </div>
      <div className="focus-timer">
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <circle cx="110" cy="110" r="101" fill="none" stroke="#34382c" strokeWidth="3" />
          <circle
            className="timer-ring"
            cx="110"
            cy="110"
            r="101"
            fill="none"
            stroke="#b8e3ce"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="635"
            strokeDashoffset="95"
          />
        </svg>
        <div>
          <Icon name="focus" size={25} />
          <strong>45:00</strong>
          <span>FOCUS SESSION</span>
        </div>
      </div>
      <h2>A little less noise.</h2>
      <p>Your time. Intentionally spent.</p>
      <div className="blocked-apps">
        <span>PAUSED WHILE YOU LEARN</span>
        {[
          ['♪', 'TikTok'],
          ['◎', 'Instagram'],
          ['𝕏', 'X'],
        ].map(([icon, name]) => (
          <div key={name}>
            <i>{icon}</i>
            <strong>{name}</strong>
            <Icon name="lock" size={15} />
          </div>
        ))}
      </div>
      <div className="available">
        <span className="mini-mark">
          <BrandMark size={19} />
        </span>
        <strong>Wyllex</strong>
        <span>
          Ready when you are <i />
        </span>
      </div>
    </div>
  );
}
export function ProgressCard() {
  return (
    <div className="app-page progress-screen">
      <div className="app-section-title">
        <Icon name="chart" />
        Your progress
      </div>
      <h2>Look at you go.</h2>
      <p>Small moments. Adding up.</p>
      <div className="streak-card">
        <Icon name="flame" size={32} />
        <strong>
          7 <span>day streak</span>
        </strong>
        <div>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i}>
              <i>
                <Icon name="check" size={13} />
              </i>
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="stats-row">
        <div>
          <span>Concepts learned</span>
          <strong>142</strong>
          <small>One “aha” at a time.</small>
        </div>
        <div>
          <span>Focused this week</span>
          <strong>
            3<small>h</small> 18<small>m</small>
          </strong>
          <small>Time well spent.</small>
        </div>
      </div>
      <div className="weekly-chart">
        <div>
          <strong>Your week in learning</strong>
          <span>212 videos</span>
        </div>
        <div className="bars">
          {[40, 68, 50, 90, 72, 100, 82].map((h, i) => (
            <div key={i}>
              <i style={{ height: `${h}%` }} />
              <span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="progress-note">
        <Icon name="book" size={16} />
        <span>5 subjects. All moving forward.</span>
      </div>
    </div>
  );
}
