import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export const dynamicParams = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getAllPosts().filter((p) => p.category === decoded);

  if (posts.length === 0) notFound();

  return (
    <main className="mx-auto max-w-2xl w-full px-4 py-16">
      <div className="mb-10">
        <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          ← 전체 글
        </Link>
        <h1 className="mt-4 text-2xl font-bold">{decoded}</h1>
        <p className="mt-1 text-sm text-zinc-500">{posts.length}개의 글</p>
      </div>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <time className="text-sm text-zinc-500">{post.date}</time>
              <h2 className="mt-1 text-xl font-semibold group-hover:underline underline-offset-4">
                {post.title}
              </h2>
              {post.description && (
                <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
