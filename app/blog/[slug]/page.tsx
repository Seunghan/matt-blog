import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

async function loadPost(slug: string) {
  const decoded = decodeURIComponent(slug);
  try {
    return await import(`@/content/posts/${decoded}.mdx`);
  } catch {
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = await loadPost(slug);
  if (!mod) notFound();

  const Post = mod.default;

  return (
    <main className="mx-auto max-w-2xl w-full px-4 py-16">
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <Post />
      </article>
    </main>
  );
}
