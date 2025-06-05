"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import type { Article } from "@/lib/types";
import Image from "next/image";
import { api } from "@/trpc/react";

interface EditArticleModalProps {
  isOpen: boolean;
  article: Article | null;
  onClose: () => void;
  onSave: () => void;
}

export function EditArticleModal({
  isOpen,
  article,
  onClose,
  onSave,
}: EditArticleModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const utils = api.useUtils();

  const updateArticle = api.articles.updateArticle.useMutation({
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

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description ?? "");
    }
  }, [article]);

  const handleSave = async () => {
    if (!article || !title) return;

    setIsSaving(true);
    try {
      await updateArticle.mutateAsync({
        id: article.id,
        title: title,
        tags: tags || article.tags || "",
      });

      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to update article:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>
            Update the title and description for this article.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-url">Article URL</Label>
            <Input
              id="edit-url"
              value={article.url}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              placeholder="Article description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {article.imageUrl && (
            <div className="grid gap-2">
              <Label>Current Image</Label>
              <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-md">
                <Image
                  src={article.imageUrl || "/placeholder.svg"}
                  alt="Article preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title || isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
