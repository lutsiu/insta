import LeftSide from "../../components/HomePage/LeftSide";
import RightSide from "../../components/HomePage/RightSide";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

export default function Home() {
  const width = useGetScreenWidth();

  const contentBigScreen = (
    <main className="flex">
      <div className="w-[15%]">
        <LeftSide/>
      </div>
      <div className="bg-gray-900 w-[55%] h-screen"></div>
      <RightSide/>

    </main>
  );
  return <>{width >= 768 && contentBigScreen}</>;
}
