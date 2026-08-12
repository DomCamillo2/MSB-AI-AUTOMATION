import { siteUrl } from '@/lib/seo';
import styles from './page-breadcrumb.module.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href === '/' ? '' : item.href}` } : {})
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
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
    </>
  );
}

export default PageBreadcrumb;
