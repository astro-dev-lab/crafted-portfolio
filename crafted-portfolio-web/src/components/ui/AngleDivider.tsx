import { cn } from '@/lib/utils';

interface AngleDividerProps {
  fromColor?: string;
  toColor?: string;
  className?: string;
}

export function AngleDivider({
  fromColor = '#030712',
  toColor = '#ffffff',
  className,
}: AngleDividerProps) {
  return (
    <div className={cn('w-full overflow-hidden leading-none', className)} aria-hidden="true">
      <svg
        className="relative block w-full h-[80px] md:h-[120px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 1200,0 1200,120 0,60" fill={fromColor} />
        <rect x="0" y="60" width="1200" height="60" fill={toColor} />
      </svg>
    </div>
  );
}
