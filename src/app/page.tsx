import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Upload, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="from-primary/10 via-background to-secondary/20 bg-gradient-to-br px-4 py-20">
        <div className="animate-fade-in mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Save Articles, <span className="text-primary">Stay Organized</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Never lose track of interesting articles again. Save them with a
            simple URL, organize them beautifully, and access them anywhere.
          </p>
          <Button size="lg" className="px-8 py-3 text-lg" asChild>
            <Link href="/articles">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Everything you need to manage articles
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Simple, powerful tools to help you save, organize, and rediscover
              your favorite content.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="animate-slide-in p-6 text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Zap className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Lightning Fast</h3>
              <p className="text-gray-600">
                Just paste a URL and we'll automatically extract the title,
                description, and image.
              </p>
            </div>

            <div
              className="animate-slide-in p-6 text-center"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Search className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Smart Search</h3>
              <p className="text-gray-600">
                Find any article instantly with our powerful search
                functionality.
              </p>
            </div>

            <div
              className="animate-slide-in p-6 text-center"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Upload className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Bulk Import</h3>
              <p className="text-gray-600">
                Import hundreds of articles at once from a CSV file.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to get organized?
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Join thousands of users who have already organized their reading
            with Flipside.
          </p>
          <Button size="lg" className="px-8 py-3 text-lg" asChild>
            <Link href="/articles">Start Saving Articles</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
