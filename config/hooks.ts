import { useEffect, useState } from 'react';
import { storage } from './firebase';

export const useBrandImage = (brandName: string) => {
  const [state, setState] = useState<string>();
  useEffect(() => {
    const f = async () => {
      const imageUrl = await storage.getBrandImage(brandName);
      setState(imageUrl);
    };

    f();
  }, []);

  return state;
};
