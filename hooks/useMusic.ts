import { useState, useEffect } from 'react';
import { fetchMusic } from '../lib/music';

export const useMusic = () => {
  const [music, setMusic] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        
        const musicData = await fetchMusic();
        
        setMusic(musicData);
        
      } catch (error) {
       console.log("error",error)
      } 
    };

    loadMusic();
  }, []);

  if(music){
    return { music };
  }
  
};