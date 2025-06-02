"use client";
import { api } from "@/trpc/react";
import React from "react";
import ArticleList from "./ArticleList";
import { Button } from "./ui/button";

export default function HomePage() {
  const utils = api.useUtils();

  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = api.articles.getAll.useQuery();

  const createArticle = api.articles.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch articles query
      utils.articles.getAll.invalidate().catch((error) => {
        console.error("Failed to invalidate cache:", error);
      });
      console.log("Article created successfully!");
    },
    onError: (error) => {
      console.log(`Failed to create article: ${error.message}`);
    },
  });

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

  const handleCreateArticle = async () => {
    try {
      await createArticle.mutateAsync({
        url: "https://janedoe.dev",
        title: "Jane's Portfolio",
        description:
          "Portfolio website of Jane Doe, software engineer and UI/UX designer",
        tags: "portfolio-website,design,frontend",
      });
    } catch (error) {
      // Error is already handled in onError callback
      console.error("Failed to create article:", error);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle.mutateAsync({
        id: articleId,
      });
    } catch (error) {
      // Error is already handled in onError callback
      console.error("Failed to deleye article:", error);
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

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="text-gray-600">Manage your articles</p>
      </div>

      <Button
        onClick={handleCreateArticle}
        disabled={createArticle.isPending}
        className="mb-4"
      >
        {createArticle.isPending ? "Creating..." : "Create Article"}
      </Button>

      {articles && (
        <ArticleList
          articles={articles}
          handleDeleteArticle={handleDeleteArticle}
        />
      )}
    </div>
  );
}
