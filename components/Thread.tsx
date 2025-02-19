// src/components/Thread.tsx

import React from "react";

interface ThreadProps {
  text: string;
  messageCount: number;
  likeCount: number;
}

const Thread: React.FC<ThreadProps> = ({ text, messageCount, likeCount }) => {
  return (
    <div className="h-[96px] w-full border-b-[1px] border-borderColor">
      <p>{text}</p>
      <div>
        <span>Messages: {messageCount}</span>
        <span>Likes: {likeCount}</span>
      </div>
    </div>
  );
};

export default Thread;
