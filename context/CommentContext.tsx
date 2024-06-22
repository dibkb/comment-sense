// PaginationContext.tsx
import { Comment } from "@/types/fastapi";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface RangeType {
  start: number;
  stop: number;
}
interface CommentContextType {
  data: Comment[];
  range: RangeType;
  loading: boolean;
  error: Error | null;
  sort: boolean;
  setData: Dispatch<SetStateAction<Comment[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<Error | null>>;
  setRange: Dispatch<SetStateAction<RangeType>>;
  //   setSort: Dispatch<SetStateAction<boolean>>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useCommentContext = (): CommentContextType => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Comment[]>([]);
  const [range, setRange] = useState<RangeType>({ start: 0, stop: 50 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sort, setSort] = useState<boolean>(false);
  const value = {
    data,
    loading,
    error,
    range,
    sort,
    setData,
    setLoading,
    setError,
    setRange,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
