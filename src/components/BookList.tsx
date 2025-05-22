
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
          <div key={i} className="animate-pulse rounded-xl overflow-hidden shadow-md">
            <div className="bg-gray-200 aspect-[2/3] rounded-t-xl"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 shimmer rounded-full w-3/4"></div>
              <div className="h-3 shimmer rounded-full w-1/2"></div>
              <div className="h-3 shimmer rounded-full w-full"></div>
              <div className="h-3 shimmer rounded-full w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-purple-200 rounded-xl p-8 bg-purple-50/30">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No books found. Try a different search term.</p>
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
