import HomePage from "@/components/HomePage";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Tools from "@/components/Tools";
// import SplineViewer from "@/components/SplineViewer";

export default function Home() {
  return (
    <div>
      <Preloader />
      {/* <Header /> */}
      <HomePage />
      <Tools/>
      {/* <SplineViewer /> */}
    </div>
  );
}
