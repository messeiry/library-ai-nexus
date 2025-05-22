
export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  publishedYear: number;
  genre: string;
  isbn: string;
};

export type AISummary = {
  text: string;
  query: string;
}
