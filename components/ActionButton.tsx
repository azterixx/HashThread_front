import React from "react";

// Один из вариантов — через 'type' и расширение:
type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="flex min-h-[32px] min-w-[40px] items-center justify-center gap-x-[4px] rounded-[16px] bg-bgLighter px-[4px] py-[8px]"
    >
      {children}
    </button>
  );
};
