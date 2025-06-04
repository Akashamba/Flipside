"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { ArticleList } from "@/components/article-list";
import { NewArticleModal } from "@/components/modals/new-article-modal";
import { EditArticleModal } from "@/components/modals/edit-article-modal";
import type { Article } from "@/lib/types";
import { api } from "@/trpc/react";

// Mock articles data
const mockArticles: Article[] = [
  {
    id: "1",
    url: "https://example.com/article-1",
    title: "The Future of Web Development",
    description:
      "Exploring the latest trends and technologies shaping the future of web development.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    userId: "user-abc",
    tags: "",
  },
  {
    id: "2",
    url: "https://example.com/article-2",
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they change the way we build applications.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    userId: "user-abc",
    tags: "",
  },
  {
    id: "3",
    url: "https://example.com/article-3",
    title: "CSS Grid vs Flexbox: When to Use Which",
    description:
      "A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    userId: "user-abc",
    tags: "",
  },
];

export default function ArticlesPage() {
  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = api.articles.getAll.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);
  const [isEditArticleModalOpen, setIsEditArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const utils = api.useUtils();

  const deleteArticle = api.articles.delete.useMutation({
    onSuccess: () => {
      // Invalidate and refetch articles query
      utils.articles.getAll.invalidate().catch((error) => {
        console.error("Failed to invalidate cache:", error);
      });
      console.log("Article deleted successfully!");
    },
    onError: (error) => {
      console.log(`Failed to delete article: ${error.message}`);
    },
  });

  const filteredArticles = useMemo((): Article[] => {
    if (!articles) return [];
    return articles.filter((article) => {
      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [articles, searchQuery]);

  const handleNewArticle = () => {
    // Refresh articles list - in real app, this would refetch from API
    console.log("Refreshing articles list...");
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setIsEditArticleModalOpen(true);
  };

  const handleUpdateArticle = () => {
    // Refresh articles list - in real app, this would refetch from API
    console.log("Refreshing articles list after update...");
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      deleteArticle.mutateAsync({ id: id });
    } catch (error) {
      console.log("Failed to delete article", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading articles...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        <p>Error loading articles: {error?.message}</p>
        <Button
          onClick={() => utils.articles.getAll.invalidate()}
          variant="outline"
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!articles) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
          <p className="mt-1 text-gray-600">
            {articles.length} article{articles.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Button onClick={() => setIsNewArticleModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Article
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Articles List or Empty State */}
      {articles.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mb-4 text-6xl text-gray-400">📚</div>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">
            No articles yet
          </h2>
          <p className="mb-6 text-gray-600">
            Add your first article to get started!
          </p>
          <Button onClick={() => setIsNewArticleModalOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add New Article
          </Button>
        </div>
      ) : (
        <ArticleList
          articles={filteredArticles}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
        />
      )}

      {/* Modals */}
      <NewArticleModal
        isOpen={isNewArticleModalOpen}
        onClose={() => setIsNewArticleModalOpen(false)}
        onSave={handleNewArticle}
      />

      <EditArticleModal
        isOpen={isEditArticleModalOpen}
        article={editingArticle}
        onClose={() => {
          setIsEditArticleModalOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleUpdateArticle}
      />
    </div>
  );
}
