import { HTMLAttributes, ReactNode } from 'react';

export default function PageBanner({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const styles = {
    marginTop: `calc(-1 * var(--header-height))`,
    paddingTop: 'var(--header-height)',
    ...props.style,
  };
  return (
    <div {...props} style={styles}>
      {children}
    </div>
  );
}
