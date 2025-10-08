import Image from "next/image";
import Logo from "../assets/es-systems-logo.png";
import HomeImg from "../assets/main.svg";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image className="h-36 w-36 object-cover mx-4" src={Logo} alt="ES systems logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr_400px] items-center">
        <div>
          <h3 className="capitalize text-4xl md:text-5xl">
            Hospitality <span className="text-primary">recruitment</span> software
          </h3>
          <p className="leading-loose max-w-md mt-4">
            Find and manage flexible staff who will delight your customers with ES Systems
            hospitality staffing application.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image className="hidden lg:block" src={HomeImg} alt="Home image" />
      </section>
    </main>
  );
};
export default HomePage;
