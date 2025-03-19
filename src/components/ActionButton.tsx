import React from "react";

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="relative inline-block overflow-visible">
      <button
        {...props}
        className="group flex h-[32px] min-w-[40px] items-center justify-center gap-x-[4px] overflow-visible rounded-[16px] bg-bgLighter px-[4px] py-[8px]"
      >
        <div className="flex items-center justify-center transition-transform delay-100 duration-200 group-hover:-translate-y-[3px] group-hover:scale-105">
          {children}
        </div>
      </button>
    </div>
  );
};
