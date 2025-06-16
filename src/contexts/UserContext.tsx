"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  balance: number;
  topUp: (amount: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);

  const topUp = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  return (
    <UserContext.Provider value={{ balance, topUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};