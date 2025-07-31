import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
    return (
        <header className="px-6 py-8 border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold">Abdulbasit</Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Blog
            </Link>
            <DarkModeToggle />
          </nav>
        </div>
      </header>
    );
}
