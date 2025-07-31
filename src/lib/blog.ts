import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content', 'blog');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
};

export function getAllBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = filename.replace('.md', '');

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        content,
      };
    })
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.md`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      content,
    };
  } catch {
    return null;
  }
}