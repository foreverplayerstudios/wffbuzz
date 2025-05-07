import React, { useEffect, useRef } from 'react';

interface HighPerformanceAdProps {
  className?: string;
  adKey?: string;
  width?: number;
  height?: number;
}

export const HighPerformanceAd: React.FC<HighPerformanceAdProps> = ({ 
  className,
  adKey = '4ec5406b1f666315605bc42863bc2f96', // Default key from your provided code
  width = 728,
  height = 90
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing content
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = '';
    }

    // Create the first script element for options
    const scriptOptions = document.createElement('script');
    scriptOptions.type = 'text/javascript';
    scriptOptions.text = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    
    // Create the second script element for invocation
    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    
    // Append scripts to the container
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(scriptOptions);
      adContainerRef.current.appendChild(scriptInvoke);
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
    };
  }, [adKey, width, height]); // Re-run if these props change

  return (
    <div 
      ref={adContainerRef} 
      className={`high-performance-ad ${className || ''}`}
      style={{ 
        minHeight: `${height}px`,
        minWidth: `${width}px`,
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
        overflow: 'hidden'
      }}
      data-ad-key={adKey}
    />
  );
};