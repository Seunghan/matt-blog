import Link from "next/link";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  return (
    <main className="mx-auto max-w-2xl w-full px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">글</h1>

      {/* 카테고리 */}
      {categories.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">카테고리</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${encodeURIComponent(cat)}`}
                className="text-sm px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 태그 필터 */}
      {tags.length > 0 && (
        <div className="mb-10">
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">태그</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                !tag
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              전체
            </Link>
            {tags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  tag === t
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 글 목록 */}
      {posts.length === 0 ? (
        <p className="text-zinc-500">글이 없습니다.</p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="group block">
                <div className="flex items-center gap-2">
                  <time className="text-sm text-zinc-500">{post.date}</time>
                  {post.category && (
                    <span className="text-xs text-zinc-400">· {post.category}</span>
                  )}
                </div>
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
      )}
    </main>
  );
}
