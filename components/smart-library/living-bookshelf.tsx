"use client"

import { motion } from "framer-motion"
import type { LibraryBook } from "./data"
import { BookCard3D } from "./book-card-3d"

interface LivingBookshelfProps {
  books: LibraryBook[]
  onOpen: (book: LibraryBook) => void
}

export function LivingBookshelf({ books, onOpen }: LivingBookshelfProps) {
  return (
    <section aria-label="Living bookshelf" className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Living Bookshelf</h2>
        <p className="text-sm text-muted-foreground">
          Every book is alive — hover for depth, click to open a cinematic reading experience.
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-secondary/40 to-card/80 px-4 pb-8 pt-10 md:px-8"
        style={{ perspective: 1200 }}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />
        <motion.div
          className="absolute inset-x-6 bottom-6 h-3 rounded-full bg-black/30 blur-md"
          aria-hidden
        />
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {books.map((book, i) => (
            <BookCard3D key={book.id} book={book} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
