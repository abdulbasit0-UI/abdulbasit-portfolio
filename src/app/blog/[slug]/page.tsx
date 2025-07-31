import { getBlogPostBySlug } from '../../../lib/blog';
import { Metadata } from 'next';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { markedHighlight } from "marked-highlight";
import { Marked } from 'marked';
import Link from 'next/link';

// Reuse the same theme names as in layout (github = light, github-dark = dark)
// But we'll load both via script in root layout for full control

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);


type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Post Not Found</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          The article you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <p className="mt-6">
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Blog
          </Link>
        </p>
      </div>
    );
  }

  // Render markdown to HTML

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Back Link */}
      < Link
        href="/blog"
        className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:underline text-sm"
      >
        ← Back to Blog
      </Link>

      {/* Title & Metadata */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {post.title}
        </h1>
        <time className="text-gray-500 dark:text-gray-400 text-sm">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      {/* Content */}
      <div
        className="blog-content text-gray-900 dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
    </article>
  );
}