export const NavBar = () => {
  return (
    <>
      <nav className={"flex h-[56px] w-full"}>
        <div
          className={"h-full flex-1 border-b-[1px] border-borderColor"}
        ></div>
        <div
          className={
            "flex-[2] border-x-[1px] border-b-[1px] border-borderColor"
          }
        ></div>
        <div
          className={"h-full flex-1 border-b-[1px] border-borderColor"}
        ></div>
      </nav>
    </>
  );
};
