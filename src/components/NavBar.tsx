"use client";
import { HEADER_MENU } from "@/shared/const/menu";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/icons/LogoIcon.png";

export const NavBar = () => {
  const pathname = usePathname();
  const isCommentsPage = pathname.startsWith("/comments/");
  return (
    <>
      <nav className={"flex h-[56px] w-full"}>
        <Link
          href={"/"}
          className={
            "flex h-full flex-1 items-center justify-center border-b-[1px] border-borderColor"
          }
        >
          <img src={Logo.src} width={36} />
          <p className="text-2xl text-textWhite">HashThread</p>
        </Link>
        <div
          className={
            "flex flex-[2] border-x-[1px] border-b-[1px] border-borderColor"
          }
        >
          {!isCommentsPage &&
            HEADER_MENU.map((item) => (
              <Link
                className={cn(
                  "flex flex-1 cursor-pointer items-center justify-center",
                  pathname === item.href && "border-b-2 border-textWhite",
                )}
                href={item.href}
                key={item.href}
              >
                <item.icon
                  className={
                    pathname === item.href ? "fill-white" : "fill-textGray"
                  }
                />
              </Link>
            ))}
        </div>
        <div
          className={"h-full flex-1 border-b-[1px] border-borderColor"}
        ></div>
      </nav>
    </>
  );
};
