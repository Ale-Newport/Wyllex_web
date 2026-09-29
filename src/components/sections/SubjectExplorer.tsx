import { useState, useRef } from 'react';
import { subjects } from '../../lib/content';
import { Icon } from '../ui/Icon';
import { track } from '../../lib/analytics';
export default function SubjectExplorer() {
  const [selected, setSelected] = useState(2);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const subject = subjects[selected];
  function select(index: number) {
    setSelected(index);
    track('subject_viewed', { subject: subjects[index].name });
  }
  return (
    <>
      <div className="subject-explorer">
        <div
          className="subject-list"
          role="tablist"
          aria-label="Law subjects"
          aria-orientation="vertical"
        >
          {subjects.map((item, index) => (
            <button
              className="subject-tab"
              id={`subject-tab-${index}`}
              key={item.name}
              type="button"
              role="tab"
              aria-selected={selected === index}
              aria-controls="subject-panel"
              tabIndex={selected === index ? 0 : -1}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                let next = index;
                if (['ArrowDown', 'ArrowRight'].includes(event.key))
                  next = (index + 1) % subjects.length;
                else if (['ArrowUp', 'ArrowLeft'].includes(event.key))
                  next = (index - 1 + subjects.length) % subjects.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = subjects.length - 1;
                else return;
                event.preventDefault();
                select(next);
                tabs.current[next]?.focus();
              }}
            >
              <span
                className="subject-code"
                style={
                  selected === index
                    ? { background: item.color, borderColor: item.color }
                    : undefined
                }
              >
                {item.short}
              </span>
              <strong>{item.name}</strong>
              <span className="subject-count">Explore the concepts</span>
              <span className="subject-indicator">
                <Icon name="plus" size={12} />
              </span>
            </button>
          ))}
        </div>
        <div
          className="subject-panel"
          id="subject-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`subject-tab-${selected}`}
        >
          <span className="eyebrow">
            <span aria-hidden="true">✳</span>
            {subject.name.toUpperCase()}
          </span>
          <h3>{subject.title}</h3>
          <p>{subject.summary}</p>
          <div className="subject-concepts">
            {subject.concepts.map((concept) => (
              <span key={concept}>{concept}</span>
            ))}
          </div>
          <div className="subject-case">
            <span>
              <Icon name="bookmark" size={12} />
              {subject.tag}
            </span>
            <h4>{subject.case}</h4>
            <p>{subject.detail}</p>
          </div>
        </div>
      </div>
      <p className="subject-note">A taste of the curriculum. Examples draw on UK and EU Law.</p>
    </>
  );
}
