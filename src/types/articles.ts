export interface Article {
  id: string;
  userId: string;
  url: string;
  title: string | null;
  description: string | null;
  tags: string | null;
  createdAt: Date | null;
}
