import { getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <main className="mx-auto max-w-2xl w-full px-4 py-16">
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <Post />
      </article>
    </main>
  );
}
