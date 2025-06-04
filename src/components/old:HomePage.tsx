"use client";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import ArticleList from "./ArticleList";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { z } from "zod";

export default function HomePage() {
  const utils = api.useUtils();
  const [url, setUrl] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    const parseResult = z.string().url().safeParse(url);

    if (!parseResult.success) {
      alert("Please enter a valid url");
      return;
    }

    try {
      await createArticle.mutateAsync({ url: url });
      setUrl("");
      setOpen(false);
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
      console.error("Failed to delete article:", error);
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

      {deleteArticle.isPending && (
        <Dialog open={true}>
          <DialogContent className="sm:max-w-[425px]">
            Deleting...
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger asChild>
            <Button>New Article</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a URL</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Input
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. https://flipside.akashamba.me"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={createArticle.isPending}
                onClick={handleSubmit}
              >
                {createArticle.isPending ? "Creating..." : "Save to Flipside"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {articles && (
        <ArticleList
          articles={articles}
          handleDeleteArticle={handleDeleteArticle}
        />
      )}
    </div>
  );
}
