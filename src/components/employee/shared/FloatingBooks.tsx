import React from 'react';
import { BookOpen, Book, Library } from 'lucide-react';

const FloatingBooks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute text-white/5 animate-floating-book"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${6 + Math.random() * 6}s`
        }}
      >
        {i % 3 === 0 ? <BookOpen size={40 + Math.random() * 40} /> : 
         i % 3 === 1 ? <Book size={40 + Math.random() * 40} /> : 
         <Library size={40 + Math.random() * 40} />}
      </div>
    ))}
  </div>
);

export default FloatingBooks;