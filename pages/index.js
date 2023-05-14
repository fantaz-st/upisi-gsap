import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export default function Home() {
  return (
    <main className={`${poppins.className} w-full`}>
      <Header />
      <Hero />
    </main>
  );
}
