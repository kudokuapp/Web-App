'use client';
import { createContext, useEffect, useState } from 'react';

interface ISidebarContext {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context for the sidebar state
export const SidebarContext = createContext<ISidebarContext>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

// Create a provider component to provide the context to child components
export const SidebarProvider: React.FC = ({ children }) => {
  // Set an initial state for the sidebar (check localStorage for existing value)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('isSidebarOpen')!) || false;
    }
    return false;
  });

  useEffect(() => {
    const storedIsSidebarOpen = localStorage.getItem('isSidebarOpen');
    if (typeof window !== 'undefined' && storedIsSidebarOpen) {
      setIsSidebarOpen(JSON.parse(storedIsSidebarOpen));
    }
  }, []);

  // Update localStorage whenever the sidebar state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen]);

  return (
    // Provide the context to child components
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
