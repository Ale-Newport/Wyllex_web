import type { CSSProperties } from 'react';
export type IconName =
  | 'arrow'
  | 'chevron'
  | 'play'
  | 'book'
  | 'bookmark'
  | 'heart'
  | 'home'
  | 'chart'
  | 'user'
  | 'check'
  | 'plus'
  | 'close'
  | 'menu'
  | 'spark'
  | 'focus'
  | 'layers'
  | 'flame'
  | 'clock'
  | 'apple'
  | 'lock'
  | 'volume'
  | 'grid';
const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  play: <path d="m9 5 11 7-11 7V5Z" />,
  book: (
    <>
      <path d="M12 5c-4-3-9-1-9-1v15s5-2 9 1c4-3 9-1 9-1V4s-5-2-9 1Z" />
      <path d="M12 5v15" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v11h-6v-8H9v8H3V10Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 8h16M4 16h16" />,
  spark: (
    <>
      <path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3Z" />
    </>
  ),
  focus: (
    <>
      <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  flame: <path d="M13 2c0 7 7 7 7 13a8 8 0 1 1-16 0c0-3 2-5 4-7 0 4 2 4 2 4 3-3 3-6 3-10Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  apple: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        d="M16.9 12.9c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.7-1.7-3.3-1.7-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.9-3-.9-1.6 0-3 .9-3.8 2.2-1.6 2.8-.4 7 1.1 9.2.8 1.1 1.7 2.3 2.9 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.7ZM14.6 6.4c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.8 1 .1 2.1-.5 2.8-1.2Z"
      />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3" />
    </>
  ),
  volume: (
    <>
      <path d="m11 4-6 5H2v6h3l6 5V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
};
export function Icon({
  name,
  size = 20,
  className = '',
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
