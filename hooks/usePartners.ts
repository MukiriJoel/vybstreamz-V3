import { useState, useEffect } from 'react';
import { fetchPartners } from '@/lib/partners';

export const usePartners = () => {
  const [partners, setPartners] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        
        const musicData = await fetchPartners();
        
        setPartners(musicData);
        
      } catch (error) {
       console.log("error",error)
      } 
    };

    loadPartners();
  }, []);

  if(partners){
    return { partners };
  }
  
};