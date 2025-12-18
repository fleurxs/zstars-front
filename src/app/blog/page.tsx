import {Language} from '@/types';
import BlogListClient from '@/components/BlogListClient';

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {lang?: string};
}) {
  const language: Language = searchParams?.lang === 'en' ? 'en' : 'ru';

  return <BlogListClient initialLanguage={language} />;
}

