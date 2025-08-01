import Link from 'next/link';
import { getAllBlogPosts } from '../../lib/blog';

export const metadata = {
  title: 'Blog | Abdulbasit',
  description: 'Technical writing on backend development, systems design, and more.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-8 last:border-b-0">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{post.title}</h2>
              </Link>
              <p className="text-gray-600 mt-2 dark:text-gray-400">{post.description}</p>
              <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}