"use client";
import { books } from "@/data/MostPopularBook";
import { CardComponents } from "../Sections/MostPopular";
import { useState } from "react";
import { IconHome, IconBook, IconUpload } from "@tabler/icons-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function Library() {
    const [selectedGenre, setSelectedGenre] = useState<string>("All");
    const [selectedSection, setSelectedSection] = useState<string>("all-books");
    
    const genres = ["All", ...Array.from(new Set(books.map(book => book.genre)))];
    const filteredBooks = selectedGenre === "All" ? books : books.filter(book => book.genre === selectedGenre);

    return(
        <div className="h-screen flex overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-64 bg-white dark:bg-surface border-r-2 border-border p-6 flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent-lightRed transition-colors border-2 border-border dark:bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <IconHome size={24} />
                    <span className="font-semibold dark:text-black ">Home</span>
                </Link>
                
                <button
                    onClick={() => setSelectedSection("all-books")}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all border-2 border-border ${
                        selectedSection === "all-books"
                            ? "bg-accent-lightGreen shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:text-black"
                            : "bg-white hover:bg-accent-lightYellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:text-black"
                    }`}
                >
                    <IconBook size={24} />
                    <span className="font-semibold">All Books</span>
                </button>
                
                <button
                    onClick={() => setSelectedSection("my-books")}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all border-2 border-border ${
                        selectedSection === "my-books"
                            ? "bg-accent-lightGreen shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-white hover:bg-accent-lightYellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                >
                    <IconUpload size={24} />
                    <span className="font-semibold">My Books</span>
                </button>
                </div>

                <div className="flex items-end justify-end">
                    <AnimatedThemeToggler duration={600} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">
                        {selectedSection === "all-books" ? "All Books" : "My Books"}
                    </h1>

                    {selectedSection === "all-books" ? (
                        <>
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-3">
                                    {genres.map((genre) => (
                                        <button
                                            key={genre}
                                            onClick={() => setSelectedGenre(genre)}
                                            className={`px-4 py-2 rounded-lg border-2 border-border font-medium transition-all ${
                                                selectedGenre === genre
                                                    ? "bg-accent-lightRed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                                    : "bg-white hover:bg-accent-lightYellow hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                            }`}
                                        >
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filteredBooks.map((book) => (
                                    <CardComponents
                                        key={book.id}
                                        id={book.id}
                                        cover={book.cover}
                                        title={book.title}
                                        author={book.author}
                                        description={book.description}
                                        genre={book.genre}
                                        borderColor={book.borderColor}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-border rounded-lg">
                            <IconUpload size={64} className="mb-4 text-zinc-400" />
                            <p className="text-xl text-zinc-600">Upload your books here</p>
                            <p className="text-sm text-zinc-400 mt-2">Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}