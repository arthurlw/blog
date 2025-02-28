export default function Footer() {
    return (
      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Arthur&apos;s Open Source Blog
          </div>
        </div>
      </footer>
    );
  }