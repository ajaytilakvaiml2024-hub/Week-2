
import React from 'react';

export const PlasticIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M8 21h8" />
    <path d="M10 3h4" />
    <path d="M10.5 3v5.618a2 2 0 0 0 0 2.764L10 13l-1.5 8" />
    <path d="M13.5 3v5.618a2 2 0 0 1 0 2.764L14 13l1.5 8" />
  </svg>
);
