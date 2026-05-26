import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(postsDirectory, filename);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? String(data.date).slice(0, 10) : "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        category: data.category ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function resolvePostPath(slug: string): string | null {
  for (const ext of [".mdx", ".md"]) {
    const fullPath = path.join(postsDirectory, slug + ext);
    if (fs.existsSync(fullPath)) return fullPath;
  }
  return null;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map((p) => p.category).filter(Boolean);
  return [...new Set(categories)];
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = posts.flatMap((p) => p.tags);
  return [...new Set(tags)];
}
