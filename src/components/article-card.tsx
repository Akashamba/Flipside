"use client"

import Image from "next/image"
import type { Article } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ArticleCardProps {
  article: Article
  onEdit: (article: Article) => void
  onDelete: (id: string) => void
}

export function ArticleCard({ article, onEdit, onDelete }: ArticleCardProps) {
  const handleDelete = () => {
    onDelete(article.id)
  }

  return (
    <Card className="card-hover animate-fade-in">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={article.imageUrl || "/placeholder.svg?height=200&width=300"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" asChild className="flex-1 mr-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Read
              </a>
            </Button>

            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" onClick={() => onEdit(article)}>
                <Edit className="h-4 w-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Article</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{article.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
