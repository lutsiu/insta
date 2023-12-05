import NavigationItem from "./NavigationItem";
import { navigationItems } from "./data/index";
export default function LeftSide() {
  return (
    <div className=" w-[16%] h-screen px-[1rem] pt-[4rem] flex flex-col">
      <h1 className="text-3xl pl-[1rem]">LutsiuGram</h1>
      <ul className="mt-[5rem] flex flex-col gap-[1rem] flex-1 ">
        {navigationItems.map((item, i) => {
          const lastIndex = navigationItems.length - 1;
          if (i !== lastIndex) {
            return <NavigationItem {...item} key={i} />;
          }
          if (i === lastIndex) {
            return (
              <div className="flex-1  flex flex-col justify-end pb-[3rem]">
                <NavigationItem {...item} key={i} />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}
