import React from "react";

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="relative inline-block overflow-visible">
      {/*
        Класс group нужен для того, чтобы дочерние элементы могли
        реагировать на hover кнопки через group-hover.
      */}
      <button
        {...props}
        className="group flex h-[32px] min-w-[40px] items-center justify-center gap-x-[4px] overflow-visible rounded-[16px] bg-bgLighter px-[4px] py-[8px]"
      >
        {/*
          Внедряем внутрь ещё один контейнер,
          который анимируем при hover через group-hover.
        */}
        <div className="flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
          {children}
        </div>
      </button>
    </div>
  );
};
