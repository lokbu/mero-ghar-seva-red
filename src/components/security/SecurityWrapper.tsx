import React, { useEffect } from 'react';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

export const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Security headers and configurations
    const addSecurityHeaders = () => {
      // Content Security Policy
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https:";
      document.head.appendChild(meta);

      // X-Content-Type-Options
      const metaContentType = document.createElement('meta');
      metaContentType.httpEquiv = 'X-Content-Type-Options';
      metaContentType.content = 'nosniff';
      document.head.appendChild(metaContentType);

      // X-Frame-Options
      const metaFrame = document.createElement('meta');
      metaFrame.httpEquiv = 'X-Frame-Options';
      metaFrame.content = 'DENY';
      document.head.appendChild(metaFrame);
    };

    // Disable right-click context menu in production
    const disableRightClick = (e: MouseEvent) => {
      if (import.meta.env.PROD) {
        e.preventDefault();
      }
    };

    // Disable F12 and other dev tools shortcuts in production
    const disableDevTools = (e: KeyboardEvent) => {
      if (import.meta.env.PROD) {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableDevTools);
    
    // Add security headers
    addSecurityHeaders();

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableDevTools);
    };
  }, []);

  return <>{children}</>;
};

export default SecurityWrapper;