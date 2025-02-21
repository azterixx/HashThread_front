// src/app/QueryClientWrapper.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

interface QueryClientWrapperProps {
  children: ReactNode;
  client: QueryClient;
}

const QueryClientWrapper: React.FC<QueryClientWrapperProps> = ({
  children,
  client,
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryClientWrapper;
