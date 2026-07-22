import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UseCaseDetailPage from '@/components/use-case-detail-page';
import { getUseCaseDetail, useCaseDetails } from '@/lib/service-detail-content';
import { createPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return useCaseDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseDetail(slug);
  if (!useCase) return {};

  return createPageMetadata({
    title: useCase.metaTitle,
    description: useCase.metaDescription,
    path: `/anwendungsfaelle/${useCase.slug}`
  });
}

export default async function UseCaseRoute({ params }: Props) {
  const { slug } = await params;
  const useCase = getUseCaseDetail(slug);
  if (!useCase) notFound();

  return <UseCaseDetailPage useCase={useCase} />;
}
