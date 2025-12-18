import {Language} from '@/types';
import BlogListClient from '@/components/BlogListClient';

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{lang?: string}>;
}) {
  const params = (await searchParams) ?? {};
  const language: Language = params.lang === 'en' ? 'en' : 'ru';

  return <BlogListClient initialLanguage={language} />;
}

