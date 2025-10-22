import React from 'react';

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.993.142" />
    <path d="M12 5a3 3 0 1 0 5.993.142" />
    <path d="M12 5a3 3 0 1 1-5.993-.142" />
    <path d="M12 5a3 3 0 1 1 5.993-.142" />
    <path d="M12 12a3 3 0 1 0-5.993.142" />
    <path d="M12 12a3 3 0 1 0 5.993.142" />
    <path d="M12 12a3 3 0 1 1-5.993-.142" />
    <path d="M12 12a3 3 0 1 1 5.993-.142" />
    <path d="M12 19a3 3 0 1 0-5.993.142" />
    <path d="M12 19a3 3 0 1 0 5.993.142" />
    <path d="M12 19a3 3 0 1 1-5.993-.142" />
    <path d="M12 19a3 3 0 1 1 5.993-.142" />
    <path d="M15 12a3 3 0 1 0-5.993.142" />
    <path d="M15 12a3 3 0 1 0 5.993.142" />
    <path d="M6 12a3 3 0 1 1-5.993-.142" />
    <path d="M18 12a3 3 0 1 1 5.993-.142" />
    <path d="M9 5a3 3 0 1 0-5.993.142" />
    <path d="M9 5a3 3 0 1 0 5.993.142" />
    <path d="M9 19a3 3 0 1 0-5.993.142" />
    <path d="M9 19a3 3 0 1 0 5.993.142" />
    <path d="M15 5a3 3 0 1 0-5.993.142" />
    <path d="M15 5a3 3 0 1 0 5.993.142" />
    <path d="M15 19a3 3 0 1 0-5.993.142" />
    <path d="M15 19a3 3 0 1 0 5.993.142" />
    <path d="M12 5v7m0 7v-7m0 0H9m3 0h3m-6 7h6m-6-14h6" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </svg>
);

export const RotateCwIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
);

export const TriangleAlertIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
    </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);