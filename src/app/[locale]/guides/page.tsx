import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';
import { generateConverterMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Guides & Tutorials',
    description:
      'Step-by-step guides and tutorials for file conversion, image editing, video processing and developer tools. All tools run 100% in your browser.',
    path: '/guides',
  });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const guides = getAllGuides(locale);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Guides & Tutorials
        </h1>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
          Step-by-step tutorials for getting the most out of Convrs tools.
          All processing is done locally in your browser — no upload required.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-zinc-400">No guides yet. Check back soon!</p>
      ) : (
        <ol className="space-y-6" role="list">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <article className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
                {/* Tags */}
                {guide.tags && guide.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  <Link href={`/${locale}/guides/${guide.slug}`} className="focus:outline-none">
                    {/* Make the whole card clickable via stretched-link pattern */}
                    <span className="before:absolute before:inset-0" />
                    {guide.title}
                  </Link>
                </h2>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {guide.description}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                  <time dateTime={guide.date}>
                    {new Date(guide.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {guide.readingTime && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{guide.readingTime} min read</span>
                    </>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
