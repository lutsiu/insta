import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import NavigationItem from "./NavigationItem";
import useGetLeftMenuData  from "./hooks/useGetLeftMenuData";
import { IoLogoInstagram } from "react-icons/io5";
import styles from './styles.module.scss';
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/stateInterface";
export default function LeftSide() {
  const width = useGetScreenWidth();
  const data = useGetLeftMenuData();
  const ui = useSelector((state: ReduxState) => state.ui);
  
  console.log(styles)
  return (
    <div 
    className={`
     h-screen px-[1rem] pt-[4rem] flex flex-col border-r-[1px] border-gray-800 ${ui?.shrinkLeftMenu ? styles['container-shrinked'] : ""}`}>
      {width >= 1200 && !ui?.shrinkLeftMenu && <h1 className="text-3xl pl-[1rem] ">LutsiuGram</h1>}
      {width < 1200 || ui?.shrinkLeftMenu && <div className="w-fit mx-auto"><IoLogoInstagram className="w-[2.5rem] h-[2.5rem]"/></div>}
      <ul className={`${styles.ul} ${ui?.shrinkLeftMenu ? styles["ul-shrinked"] : ""} mt-[5rem] flex flex-col gap-[1rem] flex-1`}>
        {data.map((item, i) => {
          const lastIndex = data.length - 1;
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
