"use client";
import { books } from "@/data/MostPopularBook";
import { notFound, useRouter } from "next/navigation";
import { FullPanel } from "@/app/Sections/Reader/FullPanel";
import { use } from "react";
import { useUser } from "@clerk/nextjs";

export default function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { bookId } = use(params);
  
  if (!isLoaded) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }
  
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    notFound();
  }
  
  return <FullPanel bookEpub={book.epub} />;
}
