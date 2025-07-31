export default function Footer() {
    return (
        <footer className="px-6 py-8 text-center text-gray-600 dark:text-gray-400 text-sm border-t bg-white dark:bg-gray-800">
        © {new Date().getFullYear()} Abdulbasit. Built with Next.js and attention to detail.
        </footer>
    );
}