import type { Article } from "@/types/articles";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

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
        <div className="w-50">
          <Link key={article.id} href={article.url} target="_blank">
            <div key={article.id} className="m-5 border-r-2 bg-amber-100">
              {article.title}
              {article.description && ` : ${article.description}`}
              <Button onClick={() => handleDeleteArticle(article.id)}>
                Delete
              </Button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
