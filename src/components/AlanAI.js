// components/AlanAI.tsx
import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const AlanAI = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      alanBtn({
        key: 'YOUR_ALAN_SDK_KEY',
      });
    }
  }, []);

  return null;
};

export default AlanAI;
