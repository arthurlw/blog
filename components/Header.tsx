import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-2xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-1xl font-bold no-underline hover:no-underline">
            Arthur&apos;s Open Source Blog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="no-underline hover:text-accent">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}