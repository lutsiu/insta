import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import NavigationItem from "./NavigationItem";
import useGetLeftMenuData from "./hooks/useGetLeftMenuData";
import { IoLogoInstagram } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/stateInterface";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
export default function LeftSide() {
  const width = useGetScreenWidth();
  const data = useGetLeftMenuData();
  const ui = useSelector((state: ReduxState) => state.ui);
  const [showInstLogo, setShowInstLogo] = useState(ui?.shrinkLeftMenu || width <1200);

  useEffect(() => {
    if (width > 1200 && !ui?.shrinkLeftMenu) {
      setShowInstLogo(false);
    }
    if (width <= 1200 || ui?.shrinkLeftMenu) {
      setShowInstLogo(true);
    }
  }, [ui?.shrinkLeftMenu, width]);
  console.log(showInstLogo)
  return (
    <motion.div
      initial={{ width: ui?.shrinkLeftMenu ? "50%" : "100%" }}
      animate={{ width: ui?.shrinkLeftMenu ? "50%" : "100%" }}
      transition={{ duration: 0.4 }}
      className={`${width < 1200 ? styles.container : ""}  h-full`}
    >
      <div className="px-[1rem] py-[4rem] flex flex-col h-full ">
        <div className="px-[1rem]">
          {!showInstLogo && (
            <p className="text-3xl">LutsiuGram</p>
          )}
          {showInstLogo  && (
            <div>
              <IoLogoInstagram className="w-[2.5rem] h-[2.5rem]" />
            </div>
          )}
        </div>
        <ul className="mt-[5rem]  flex-1 flex flex-col gap-[1rem]">
          {data.map((item, i) => {
            if (i !== data.length - 1) {
              return <NavigationItem key={i} {...item} />;
            } else {
              return (
                <div className="flex-1 flex items-end" key={i}>
                  <NavigationItem {...item} />
                </div>
              );
            }
          })}
        </ul>
      </div>
    </motion.div>
  );
}
