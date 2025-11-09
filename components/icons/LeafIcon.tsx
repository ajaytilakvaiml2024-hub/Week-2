
import React from 'react';

export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 4 13q0-4.5 4.5-5A7 7 0 0 1 18 13a7 7 0 0 1-7 7Z" />
    <path d="M12 20v-9" />
  </svg>
);
