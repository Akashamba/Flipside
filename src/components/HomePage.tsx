"use client";

import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import ArticleList from "./ArticleList";
import { Button } from "./ui/button";

export default function HomePage() {
  const createArticle = api.articles.create.useMutation();
  const articles = api.articles.getAll.useQuery().data;

  const handleSave = async (article: any) => {
    await createArticle.mutateAsync(article);
    alert("Article added!");
  };

  return (
    <div>
      <p>Hello</p>
      <Button
        onClick={() =>
          handleSave({
            url: "https://janedoe.dev",
            title: "Jane's Portfolio",
            description:
              "Portfolio website of Jane Doe, software engineer and UI/UX designer",
            tags: "portfolio-website,design,frontend",
          })
        }
      >
        Create Article
      </Button>
      <ArticleList articles={articles} />
    </div>
  );
}
