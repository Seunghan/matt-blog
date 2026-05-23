import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-2xl w-full px-4 py-16">
      <h1 className="text-2xl font-bold mb-10">글</h1>
      {posts.length === 0 ? (
        <p className="text-zinc-500">아직 글이 없습니다.</p>
      ) : (
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
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
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
