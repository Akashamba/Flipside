import type { Article } from "@/types/articles";
import React from "react";
import { Button } from "./ui/button";

interface ArticleListProps {
  articles: Article[];
  handleDeleteArticle: (id: string) => void;
}

export default function ArticleList({
  articles,
  handleDeleteArticle,
}: ArticleListProps) {
  if (!articles) {
    return <div>You do not have any saved articles</div>;
  }
  return (
    <div>
      {articles.map((article: Article) => (
        <div key={article.id}>
          {article.title}: {article.description}
          <Button onClick={() => handleDeleteArticle(article.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
