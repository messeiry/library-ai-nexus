
import { Book } from "@/types/book";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl animate-bounce-in rounded-xl border border-transparent hover:border-purple-200 group">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={book.coverUrl} 
          alt={`${book.title} cover`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm line-clamp-3 text-gray-700 min-h-[4.5rem]">{book.description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600">
          {book.genre}
        </Badge>
        <span className="text-xs text-gray-500">{book.publishedYear}</span>
      </CardFooter>
    </Card>
  );
};
