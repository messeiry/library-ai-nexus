export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  publishedYear: number;
  genre: string;
  isbn: string;
  pages?: number;
  language?: string;
  publisher?: string;
  rating?: number;
  checked_out?: boolean;
  checkout_date?: string | null;
  due_date?: string | null;
};

export type AISummary = {
  text: string;
  query: string;
}
