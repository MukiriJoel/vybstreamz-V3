import { useState, useEffect } from 'react';
import { fetchBooks } from '@/lib/books';

export const useBooks = () => {
  const [books, setBooks] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        
        const musicData = await fetchBooks();
        
        setBooks(musicData);
        
      } catch (error) {
       console.log("error",error)
      } 
    };

    loadBooks();
  }, []);

  if(books){
    return { books };
  }
  
};