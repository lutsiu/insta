import LeftSide from "../../components/HomePage/LeftSide";

export default function Home() {

  return (
    <main className="flex">
      <LeftSide/>
      <div className="bg-gray-900 w-[54%] h-screen"></div>
      <div className="bg-green-800 w-[30%] h-screen"></div>
    </main>
  )
}