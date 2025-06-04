import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 text-sm text-gray-600 md:mb-0">
            © {new Date().getFullYear()} Flipside. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="hover:text-primary text-sm text-gray-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="hover:text-primary text-sm text-gray-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="hover:text-primary text-sm text-gray-600 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
