import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Upload, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Save Articles, <span className="text-primary">Stay Organized</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Never lose track of interesting articles again. Save them with a simple URL, organize them beautifully, and
            access them anywhere.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/articles">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, powerful tools to help you save, organize, and rediscover your favorite content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-slide-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Just paste a URL and we'll automatically extract the title, description, and image.
              </p>
            </div>

            <div className="text-center p-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
              <p className="text-gray-600">Find any article instantly with our powerful search functionality.</p>
            </div>

            <div className="text-center p-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bulk Import</h3>
              <p className="text-gray-600">Import hundreds of articles at once from a CSV file.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to get organized?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have already organized their reading with ArticleSaver.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/articles">Start Saving Articles</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
