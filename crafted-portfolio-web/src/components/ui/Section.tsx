import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, children, ...props }, ref) => (
    <section ref={ref} className={cn('py-16 lg:py-24', className)} {...props}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  )
);
Section.displayName = 'Section';

export { Section };
