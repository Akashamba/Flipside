export interface Article {
  id: string;
  userId: string;
  url: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  tags: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleMetadata {
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
}

export interface CSVImportResult {
  success: boolean;
  importedCount: number;
  errors: string[];
}
