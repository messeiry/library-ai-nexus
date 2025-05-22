
import { Book } from "@/types/book";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. 'To Kill A Mockingbird' became both an instant bestseller and a critical success when it was first published in 1960.",
    publishedYear: 1960,
    genre: "Fiction",
    isbn: "978-0061120084"
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
    description: "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes.",
    publishedYear: 1949,
    genre: "Dystopian",
    isbn: "978-0451524935"
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
    description: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession.'",
    publishedYear: 1925,
    genre: "Fiction",
    isbn: "978-0743273565"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/800px-PrideAndPrejudiceTitlePage.jpg",
    description: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child.'",
    publishedYear: 1813,
    genre: "Romance",
    isbn: "978-0486284736"
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
    description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep.",
    publishedYear: 1937,
    genre: "Fantasy",
    isbn: "978-0547928227"
  }
];
