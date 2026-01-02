"use client";
import { books } from "@/data/MostPopularBook";
import { notFound } from "next/navigation";
import { FullPanel } from "@/app/Sections/Reader/FullPanel";
import { use } from "react";

export default function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = use(params);
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    notFound();
  }
  
  return <FullPanel bookEpub={book.epub} />;
}
