import { useSelector } from "react-redux";
import AccountItem from "./AccountItem";
import { ReduxState } from "../../../redux/stateInterface";

interface IAccountItemData {
  img: string;
  userName: string;
  fullNameOrFollowers: string;
}

export default function RightSide() {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dummyData: IAccountItemData[] = Array.from({ length: 5 }, () => {
    return {
      img: "https://sklepotaku.pl/userdata/public/news/images/4.jpg",
      userName: "dummyUser",
      fullNameOrFollowers: "followed by somebody + 4 more",
    };
  });
  return (
    <div className="xl:w-[25%] 2xl:w-[20%] mt-[5rem] pl-[2rem]">
      <AccountItem
        isUserAccount={true}
        img={"https://sklepotaku.pl/userdata/public/news/images/4.jpg"}
        userName={"lutsiu"}
        fullNameOrFollowers={"Sasha"}
      />
      <div className="flex justify-between mt-[3rem] mb-[2rem]">
        <p className="text-gray-300 font-semibold text-xl">Suggested for you</p>
        <p className="text-lg ">See All</p>
      </div>
      <ul className="flex flex-col gap-[1.7rem]">
        {dummyData.map((user, i) => {
          return <AccountItem key={i} {...user} isUserAccount={false} />;
        })}
      </ul>
      <div className="mt-[4.5rem] text-gray-300">© {new Date().getFullYear()} LUTSIUGRAM FROM LUTSIU</div>
    </div>
  );
}
