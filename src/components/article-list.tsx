"use client"

import type { Article } from "@/lib/types"
import { ArticleCard } from "./article-card"

interface ArticleListProps {
  articles: Article[]
  onEdit: (article: Article) => void
  onDelete: (id: string) => void
}

export function ArticleList({ articles, onEdit, onDelete }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No articles found</div>
        <p className="text-gray-400">Try adjusting your search or add a new article</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
