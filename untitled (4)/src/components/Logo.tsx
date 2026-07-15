import React from 'react';

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 355 150" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(5, 5)">
        {/* Gray square */}
        <rect x="0" y="78" width="22" height="22" rx="2" fill="#939598" />
        
        {/* Red D */}
        <path d="M 0 70 V 2 C 0 0.9 0.9 0 2 0 H 55 C 85 0 110 20 110 50 C 110 80 85 100 55 100 H 32 C 30.9 100 30 99.1 30 98 V 78 C 30 76.9 30.9 76 32 76 H 55 C 72 76 88 65 88 50 C 88 35 72 22 55 22 H 24 C 22.9 22 22 22.9 22 24 V 70 C 22 71.1 21.1 72 20 72 H 2 C 0.9 72 0 71.1 0 70 Z" fill="#C8102E" />
        
        {/* Red I */}
        <rect x="132" y="0" width="22" height="100" rx="2" fill="#C8102E" />
        
        {/* Red B */}
        <path d="M 178 2 C 178 0.9 178.9 0 180 0 H 223 C 243 0 258 10 258 25 C 258 35 250 44 238 48 C 253 52 263 62 263 75 C 263 92 246 100 223 100 H 180 C 178.9 100 178 99.1 178 98 V 2 Z M 200 22 V 40 H 223 C 233 40 236 35 236 30 C 236 25 233 22 223 22 H 200 Z M 200 60 V 78 H 226 C 238 78 241 74 241 68 C 241 62 238 60 226 60 H 200 Z" fill="#C8102E" />

        {/* Red E */}
        <rect x="285" y="0" width="60" height="22" rx="2" fill="#C8102E" />
        <rect x="285" y="39" width="60" height="22" rx="2" fill="#C8102E" />
        <rect x="285" y="78" width="60" height="22" rx="2" fill="#C8102E" />
      </g>
      <text x="175" y="142" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="500" fontSize="23" fill="#939598" letterSpacing="0.4em" textAnchor="middle">ENGINEERING</text>
    </svg>
  );
}
