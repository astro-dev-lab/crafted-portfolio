import { forwardRef, HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

interface AvatarImageProps {
  alt: string;
  src?: string;
  className?: string;
}

const AvatarImage = forwardRef<HTMLDivElement, AvatarImageProps>(({ className, alt, src }, ref) => {
  if (!src) return null;

  return (
    <div ref={ref} className={cn('aspect-square h-full w-full', className)}>
      <Image src={src} alt={alt} fill className='object-cover' unoptimized />
    </div>
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600',
        className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
