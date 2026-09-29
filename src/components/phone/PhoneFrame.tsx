import {
  BottomNavigation,
  FeedVideo,
  FocusMode,
  FormatScreen,
  KnowledgeScreen,
  CreateReelScreen,
  ProgressCard,
  SubjectSelector,
} from '../app/AppUI';
export function PhoneFrame({ stage, format }: { stage: number; format: number }) {
  const feedVisible = [0, 2, 8].includes(stage);
  return (
    <div className="phone-frame" aria-hidden="true">
      <div className="phone-button button-action" />
      <div className="phone-button button-volume-up" />
      <div className="phone-button button-volume-down" />
      <div className="phone-button button-power" />
      <div className="phone-bezel">
        <div className="phone-screen">
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-symbols">
              <svg width="14" height="11" viewBox="0 0 14 11">
                <path
                  d="M1 10V7h2v3H1Zm4 0V5h2v5H5Zm4 0V3h2v7H9Zm4 0V0h1v10h-1Z"
                  fill="currentColor"
                />
              </svg>
              <svg width="13" height="11" viewBox="0 0 13 11">
                <path
                  d="M1 3a9 9 0 0 1 11 0M3 6a5 5 0 0 1 7 0M5.5 9a1 1 0 0 1 2 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="battery" />
            </div>
          </div>
          <div className="dynamic-island">
            <i />
          </div>
          <div className={`app-screen ${feedVisible ? 'is-visible' : ''}`} data-screen="feed">
            <div
              className="feed-track"
              style={{
                transform:
                  stage === 2
                    ? 'translate3d(0, calc(var(--feed-offset, 0) * -1px), 0)'
                    : 'translate3d(0,0,0)',
              }}
            >
              <FeedVideo />
              <FeedVideo type="case" />
              <FeedVideo type="mind" />
            </div>
          </div>
          <div className={`app-screen ${stage === 1 ? 'is-visible' : ''}`} data-screen="subjects">
            <SubjectSelector />
          </div>
          <div className={`app-screen ${stage === 3 ? 'is-visible' : ''}`} data-screen="formats">
            <FormatScreen format={format} />
          </div>
          <div className={`app-screen ${stage === 4 ? 'is-visible' : ''}`} data-screen="knowledge">
            <KnowledgeScreen />
          </div>
          <div className={`app-screen ${stage === 5 ? 'is-visible' : ''}`} data-screen="personal">
            <CreateReelScreen />
          </div>
          <div className={`app-screen ${stage === 6 ? 'is-visible' : ''}`} data-screen="focus">
            <FocusMode />
          </div>
          <div className={`app-screen ${stage === 7 ? 'is-visible' : ''}`} data-screen="progress">
            <ProgressCard />
          </div>
          <BottomNavigation
            active={
              stage === 5
                ? 'Create'
                : stage === 4
                  ? 'Library'
                  : stage === 7
                    ? 'More'
                    : stage === 1
                      ? 'Modules'
                      : 'Reels'
            }
          />
          <div className="home-indicator" />
        </div>
      </div>
      <div className="phone-reflection" />
    </div>
  );
}
