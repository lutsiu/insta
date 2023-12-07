import { useSelector } from "react-redux";
import useGetScreenWidth from "../../../../hooks/useGetScreenWidth";
import { INavigationItem } from "../hooks/useGetLeftMenuData";
import styles from "./styles.module.scss";
import { ReduxState } from "../../../../redux/stateInterface";
import { motion } from "framer-motion";
export default function NavigationItem(props: INavigationItem) {
  const { icon, handleOnClick, content } = props;
  const screenWidth = useGetScreenWidth();
  const ui = useSelector((state: ReduxState) => state.ui);
  return (
    <li
      onClick={handleOnClick}
      className={`${styles.item} flex items-center ${
        screenWidth >= 1200 && !ui?.shrinkLeftMenu ? "w-full" : "w-fit"
      } cursor-pointer gap-[1.5rem] p-[1rem] rounded-lg`}
    >
      {content !== "Profile" && (
        <div className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
          {icon}
        </div>
      )}
      {content === "Profile" && (
        <div className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
          {icon}
        </div>
      )}

      {screenWidth >= 1200 && !ui?.shrinkLeftMenu && (
        <p className="text-2xl">{content}</p>
      )}
    </li>
  );
}
