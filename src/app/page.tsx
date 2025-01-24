import {Hero} from "../app/components/hero";
import { LogoSection } from "../app/components/logosection"
import NewArrival from "./components/newarrivals";
import TopSeller from "./components/topsell";

import Customer from "./components/customer";

import ResponsiveGrid from "./components/category";

export default function Home() {
  return (
  <div className="max-w-full h-full flex-grow justify-start items-center">
    <Hero/>
    <LogoSection/>
    <NewArrival/>
    <TopSeller/>
    <ResponsiveGrid/>
    <Customer/>
  </div>
  );
}