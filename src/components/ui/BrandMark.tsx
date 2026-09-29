import brand from '../../config/brand.json';

/** The folded W: a continuous learning path with a page lifting from the last stroke. */
export function BrandMark({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`brand-mark ${className}`}
      width={size}
      height={size}
      viewBox={brand.markViewBox}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={brand.markPath} />
    </svg>
  );
}
