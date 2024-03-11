import clsx from 'clsx';

type Props = {
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
};

export function P3({ className, element = 'p', children }: Props) {
  const Element = element;

  return (
    <div
      className={clsx(
        'text-sm leading-[1.2] font-medium dark:text-[#7C7C7C] text-[#7C7C7C]',
        className
      )}
    >
      <Element className={className}>{children}</Element>
    </div>
  );
}
