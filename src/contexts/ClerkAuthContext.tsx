import React, { createContext, useContext } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';

interface AuthContextType {
  user: any;
  session: any;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, signOut: clerkSignOut } = useClerkAuth();
  const { user: clerkUser } = useUser();

  const signOut = async () => {
    try {
      await clerkSignOut();
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      window.location.href = '/auth';
    }
  };

  const value = {
    user: isSignedIn ? clerkUser : null,
    session: isSignedIn ? { user: clerkUser } : null,
    loading: !isLoaded,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};