import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceCategoryPage from '@/components/service-category-page';
import { getServiceCategory, serviceCategories } from '@/lib/service-detail-content';
import { createPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  if (!category) return {};

  return createPageMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/leistungen/${category.slug}`
  });
}

export default async function ServiceCategoryRoute({ params }: Props) {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  if (!category) notFound();

  return <ServiceCategoryPage category={category} />;
}
