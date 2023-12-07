import { useSelector } from "react-redux";
import useGetScreenWidth from "../../../../hooks/useGetScreenWidth";
import { INavigationItem } from "../hooks/useGetLeftMenuData";
import styles from './styles.module.scss'
import { ReduxState } from "../../../../redux/stateInterface";
export default function NavigationItem(props: INavigationItem) {
  const { icon, handleOnClick, content } = props;
  const width = useGetScreenWidth();
  const ui = useSelector((state: ReduxState) => state.ui);
  return (
    <li
      onClick={handleOnClick}
      className={`cursor-pointer flex items-center gap-[1.5rem]  rounded-lg py-[1rem] px-[1rem] ${styles.item}`}
    >
      {content === "Profile" && (
        <div className="w-[2.3rem] h-[2.3rem] rounded-full overflow-hidden">
          {icon}
        </div>
      )}
      {content !== "Profile" && <div>{icon}</div>}
      {width >= 1200 && !ui?.shrinkLeftMenu && <p className="text-2xl font-medium">{content}</p>}
    </li>
  );
}
