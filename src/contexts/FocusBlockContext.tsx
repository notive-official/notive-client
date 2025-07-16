"use client";

import React, { createContext, useContext, useState } from "react";

interface FocusBlockContextType {
  focusedBlockId: string | null;
  setFocusedBlockId: (id: string | null) => void;
}

const FocusBlockContext = createContext<FocusBlockContextType | undefined>(
  undefined
);

export const FocusBlockProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  return (
    <FocusBlockContext.Provider value={{ focusedBlockId, setFocusedBlockId }}>
      {children}
    </FocusBlockContext.Provider>
  );
};

export const useFocusBlock = () => {
  const context = useContext(FocusBlockContext);
  if (!context)
    throw new Error("useFocusBlock must be used within a FocusBlockProvider");
  return context;
};
