
import { Book } from "@/types/book";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={book.coverUrl} 
          alt={`${book.title} cover`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm line-clamp-3 text-gray-700 min-h-[4.5rem]">{book.description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <Badge variant="outline">{book.genre}</Badge>
        <span className="text-xs text-gray-500">{book.publishedYear}</span>
      </CardFooter>
    </Card>
  );
};
