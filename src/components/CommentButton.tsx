import Link from "next/link";
import { Button } from "./ui";
import { cn, formatCount } from "@/shared/lib/utils";
import MessageIcon from "@/icons/MessageIcon";

interface CommentButtonProps {
  count: number;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}
export const CommentButton = ({
  count,
  isActive,
  href,
  onClick,
}: CommentButtonProps) => {
  
  const button = (
    <Button
      onClick={onClick}
      className={cn("text-textGray px-4", isActive && "text-primaryGreen")}
    >
      <MessageIcon />
      <span>{formatCount(count)}</span>
    </Button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
};
