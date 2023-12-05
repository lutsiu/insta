import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import NavigationItem from "./NavigationItem";
import { navigationItems } from "./data/index";
import { IoLogoInstagram } from "react-icons/io5";
export default function LeftSide() {
  const width = useGetScreenWidth();
  return (
    <div className="lg:w-[6%] xl:w-[16%] h-screen px-[1rem] pt-[4rem] flex flex-col border-r-[1px] border-gray-800">
      {width >= 1200 && <h1 className="text-3xl pl-[1rem] ">LutsiuGram</h1>}
      {width <1200 && <div className="w-fit mx-auto"><IoLogoInstagram className="w-[2.5rem] h-[2.5rem]"/></div>}
      <ul className="w-fit lg:mx-auto 2xl:mx-0  mt-[5rem] flex flex-col gap-[1rem] flex-1 ">
        {navigationItems.map((item, i) => {
          const lastIndex = navigationItems.length - 1;
          if (i !== lastIndex) {
            return <NavigationItem {...item} key={i} />;
          }
          if (i === lastIndex) {
            return (
              <div key={i} className="flex-1  flex flex-col justify-end pb-[3rem]">
                <NavigationItem {...item} />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}
