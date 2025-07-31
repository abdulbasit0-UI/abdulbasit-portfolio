import Link from 'next/link';
import { getAllBlogPosts } from '../lib/blog';
import DarkModeToggle from './components/DarkModeToggle';
import Terminal from './components/Terminal';
export default function Home() {
  const recentBlogs = getAllBlogPosts().slice(0, 2);

  return (
    <>


      <main className="max-w-4xl mx-auto   px-6 py-12 flex-1">
        {/* Hero */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Backend Developer</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
            Building robust, scalable systems with Node.js, Python, and modern DevOps practices.
            Focused on clean architecture, performance, and automation.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/abdulbasit0-UI"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdulhussain084/"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              CV
            </a>
          </div>
        </section>

        <section className="my-16">
          <h3 className="text-2xl font-semibold mb-6">Playground: Ask Me Anything</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Type commands like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">skills</code>,{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">experience</code>, or{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">blog</code>
          </p>
          <Terminal />
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <ul className="flex flex-wrap gap-3">
            {[
              'Next.js',
              'NestJS',
              'Node.js',
              'Express',
              'Python',
              'Scrapy',
              'MongoDB',
              'Docker',
              'Git / GitHub',
              'Agile',
              'REST',
              'TypeScript',
              'Linux',
              'CI/CD',
            ].map((tech) => (
              <li
                key={tech}
                className="bg-white dark:bg-gray-800 px-3 py-1 rounded border dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 shadow-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Work Experience</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>

            <div className="space-y-12">
              {/* TechFlow - Senior Backend Engineer */}
              <div className="relative flex items-start gap-6">
                {/* Circle with year */}
                <div className="absolute left-6 top-1 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-800 shadow"></div>
                </div>
                <div className="ml-16 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-medium">Senior Backend Engineer @ TechFlow</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Jan 2022 – Present</p>
                  <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Developed microservices using NestJS and Docker, deployed on AWS ECS</li>
                    <li>Built internal API gateway reducing latency by 40%</li>
                    <li>Led migration from monolith to modular backend using Node.js + MongoDB</li>
                  </ul>
                </div>
              </div>

              {/* DataHarvest - Backend Developer */}
              <div className="relative flex items-start gap-6">
                {/* Circle with year */}
                <div className="absolute left-6 top-1 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-800 shadow"></div>
                </div>
                <div className="ml-16 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-medium">Backend Developer @ DataHarvest</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Jun 2020 – Dec 2021</p>
                  <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Designed and maintained large-scale web scrapers using Python + Scrapy</li>
                    <li>Integrated scraped data into MongoDB pipelines for real-time analytics</li>
                    <li>Improved scraper resilience with rotating proxies and retry logic</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Education</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>

            {/* Education entry */}
            <div className="relative flex items-start gap-6">
              {/* Circle with year */}
              <div className="absolute left-6 top-1 z-10">
                <div className="w-6 h-6 rounded-full bg-green-600 border-4 border-white dark:border-gray-800 shadow flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2020</span>
                </div>
              </div>

              {/* Content card */}
              <div className="ml-16 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-xl font-medium">B.S. in Computer Science</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">University of Engineering & Tech</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Graduated with honors. Thesis: <em>"Efficient Data Extraction in Dynamic Web Environments"</em>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2016 – 2020</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Notable Projects</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>

            <div className="space-y-8">
              {/* Project 1: Scrapy Orchestrator */}
              <div className="relative flex items-start gap-6">
                {/* Timeline circle */}
                <div className="absolute left-6 top-1 z-10">
                  <div className="w-6 h-6 rounded-full bg-purple-600 border-4 border-white dark:border-gray-800 shadow flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2022</span>
                  </div>
                </div>
                <div className="ml-16 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-medium">Scrapy Orchestrator</h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    A Docker-based system to run and monitor multiple Scrapy spiders with centralized logging and MongoDB output.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <strong>Tech:</strong> Python, Scrapy, Docker, MongoDB
                  </p>
                </div>
              </div>

              {/* Project 2: API Gateway (NestJS) */}
              <div className="relative flex items-start gap-6">
                {/* Timeline circle */}
                <div className="absolute left-6 top-1 z-10">
                  <div className="w-6 h-6 rounded-full bg-purple-600 border-4 border-white dark:border-gray-800 shadow flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2021</span>
                  </div>
                </div>
                <div className="ml-16 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-medium">API Gateway (NestJS)</h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    High-performance gateway with rate limiting, JWT auth, and service discovery for 10+ microservices.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <strong>Tech:</strong> NestJS, Redis, Docker, Kubernetes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Blog Preview */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Recent Writing</h3>
          <div className="space-y-6">
            {recentBlogs.map((post) => (
              <article key={post.slug} className="border-b pb-6 last:border-b-0 dark:border-gray-700">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">{post.title}</h4>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{post.description}</p>
                <time className="text-sm text-gray-500 dark:text-gray-500">{post.date}</time>
              </article>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-block mt-6 text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all posts →
          </Link>
        </section>
      </main>


    </>
  );
}

// Import DarkModeToggle here since it's used