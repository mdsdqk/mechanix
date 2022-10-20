import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mechanix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <NavBar />
      <div className="relative">
        <div className="">
          <Hero />
        </div>
        <div className="absolute p-4 md:p-2 top-80 w-full md:w-1/3 md:top-16 md:right-4">
          <AppointmentForm />
        </div>
      </div>
    </>
  );
}