"use client";

import { useState } from "react";
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
import Image from "next/image";
import { getMetadata } from "@/lib/utils";
import { api } from "@/trpc/react";
import { create } from "node:domain";

interface NewArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function NewArticleModal({
  isOpen,
  onClose,
  onSave,
}: NewArticleModalProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const utils = api.useUtils();

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

  const handleUrlBlur = async () => {
    if (!url || !url.startsWith("http")) return;

    setIsLoadingMetadata(true);
    try {
      const metadata = await getMetadata(url);
      setTitle(metadata.title || url);
      // setDescription(metadata.description)
      // setImageUrl(metadata.imageUrl || "")
    } catch (error) {
      console.error("Failed to fetch metadata:", error);
    } finally {
      setIsLoadingMetadata(false);
    }
  };

  const handleSave = async () => {
    if (!url || !title) return;

    setIsSaving(true);
    try {
      await createArticle.mutateAsync({
        url: url,
        title: title,
        description: description,
        // imageUrl: imageUrl || undefined,
      });

      // Reset form
      setUrl("");
      setTitle("");
      setDescription("");
      setImageUrl("");

      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save article:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    setTitle("");
    setDescription("");
    setImageUrl("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Article</DialogTitle>
          <DialogDescription>
            Enter the URL of the article you want to save. We'll automatically
            fetch the title and description.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">Article URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={handleUrlBlur}
            />
          </div>

          {isLoadingMetadata && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span className="text-muted-foreground text-sm">
                Fetching article details...
              </span>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Article description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {imageUrl && (
            <div className="grid gap-2">
              <Label>Preview Image</Label>
              <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-md">
                <Image
                  src={imageUrl || "/placeholder.svg"}
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
          <Button onClick={handleSave} disabled={!url || !title || isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Article
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
