type CommentProps = {
  text: string;
};

export const Comments = ({ text }: CommentProps) => {
  return (
    <div className="rounded-t-lg border-2 border-borderColor p-4">
      <div className="flex gap-x-[12px]">
        <div className="h-[36px] w-[36px] rounded-full bg-[#999999]" />
        <div className="flex flex-col gap-y-[6px]">
          <span className="inline-block h-[19px] font-inter font-mMedium leading-mMedium text-textWhite">
            Anonym
          </span>
          <p className="custom-wrap-class font-inter text-m font-m leading-m text-textWhite">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
