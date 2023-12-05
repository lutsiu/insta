import LeftSide from "../../components/HomePage/LeftSide";
import RightSide from "../../components/HomePage/RightSide";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

export default function Home() {

  const width = useGetScreenWidth();

  return (
    <main className="flex">
      <LeftSide/>
      <div className="bg-gray-900 w-[54%] h-screen"></div>
      {width > 1200 && <RightSide/>}
    </main>
  )
}