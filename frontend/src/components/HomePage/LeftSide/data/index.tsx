import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiPlusSquareLight } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";

function handleClickHomeItem() {
  console.log("home")
}

function handleSearchItem() {
  console.log("search")
}

function handleExploreItem() {
  console.log("explore")
}

function handleReelsItem() {
  console.log("reels")
}

function handleMessagesItem() {
  console.log("messages")
}

function handleNotificationItem() {
  console.log("notification")
}

function handleCreateItem() {
  console.log("create")
}

function handleProfileItem() {
  console.log("profile")
}

function handleMoreItem() {
  console.log("more");
}

export interface INavigationItem {
  icon: React.ReactNode;
  handleOnClick: () => void;
  content: string
}

export const navigationItems: INavigationItem[] = [
  {
    icon: <AiFillHome className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleClickHomeItem,
    content: "Home"
  },
  {
    icon: <IoSearch className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleSearchItem,
    content: "Search"
  },
  {
    icon: <FaRegCompass className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleExploreItem,
    content: "Explore"
  },
  {
    icon: <GoVideo className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleReelsItem,
    content: "Reels"
  },
  {
    icon: <RiSendPlaneFill className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleMessagesItem,
    content: "Messages"
  },
  {
    icon: <IoMdHeartEmpty className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleNotificationItem,
    content: "Notifications"
  },
  {
    icon: <PiPlusSquareLight className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleCreateItem,
    content: "Create"
  },
  {
    icon: <img src="https://sklepotaku.pl/userdata/public/news/images/4.jpg" alt="User icon" className="w-full h-full object-cover" />,
    handleOnClick: handleProfileItem,
    content: "Profile"
  },
  {
    icon: <AiOutlineMenu className="w-[2.5rem] h-[2.5rem]" />,
    handleOnClick: handleMoreItem,
    content: "More"
  },
];