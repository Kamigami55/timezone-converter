import clsx from 'clsx';

type Props = {
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
};

export function H1({ className, element = 'h1', children }: Props) {
  const Element = element;

  return (
    <div
      className={clsx(
        'text-[2rem] leading-[1.2] font-bold dark:text-white text-black',
        className
      )}
    >
      <Element className={className}>{children}</Element>
    </div>
  );
}
