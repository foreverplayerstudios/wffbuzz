import React, { useEffect, useRef } from 'react';

interface AdvertisementProps {
  className?: string;
}

export const Advertisement: React.FC<AdvertisementProps> = ({ className }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the first script element
    const scriptOptions = document.createElement('script');
    scriptOptions.type = 'text/javascript';
    scriptOptions.text = `
      atOptions = {
        'key' : '4ec5406b1f666315605bc42863bc2f96',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    
    // Create the second script element
    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = '//www.highperformanceformat.com/4ec5406b1f666315605bc42863bc2f96/invoke.js';
    
    // Append scripts to the container
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(scriptOptions);
      adContainerRef.current.appendChild(scriptInvoke);
    }

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (adContainerRef.current) {
        if (scriptOptions.parentNode === adContainerRef.current) {
          adContainerRef.current.removeChild(scriptOptions);
        }
        if (scriptInvoke.parentNode === adContainerRef.current) {
          adContainerRef.current.removeChild(scriptInvoke);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ${className || ''}`}
      style={{ 
        minHeight: '90px',
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0'
      }}
    />
  );
};