import styles from './page-breadcrumb.module.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="Brotkrümelnavigation">
      <ol className="container">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          if (isLast || !item.href) {
            return (
              <li key={item.label} aria-current="page">
                {item.label}
              </li>
            );
          }

          return (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default PageBreadcrumb;
