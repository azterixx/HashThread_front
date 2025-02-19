"use client";
import React, { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { FeedData, fetchFeed } from "../lib/api/Feed";
import Thread from "./Thread";

// Типизируем компонент, добавляя children
interface FeedProps {
  children?: ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  const { data, error, isLoading } = useQuery<FeedData[]>({
    queryKey: ["feed"], // передаем queryKey как объект с обязательным полем queryKey
    queryFn: fetchFeed, // функция запроса
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto h-screen w-1/2 bg-bgDark">
      {children} {/* Здесь выводим переданные дочерние элементы */}
      {/*<div className="feed">*/}
      {/*  {data?.map((thread: FeedData) => (*/}
      {/*    <Thread*/}
      {/*      key={thread._id}*/}
      {/*      text={thread.text}*/}
      {/*      messageCount={thread.messageCount}*/}
      {/*      likeCount={thread.likeCount}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
};

export default Feed;
