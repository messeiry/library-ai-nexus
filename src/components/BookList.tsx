
import { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";

interface BookListProps {
  books: Book[];
  isLoading: boolean;
}

export const BookList = ({ books, isLoading }: BookListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-[2/3] rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No books found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
