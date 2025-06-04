import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} ArticleSaver. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
