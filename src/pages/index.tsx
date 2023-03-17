import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import PlanetsList from "@/components/PlanetsList";
import { PlanetsAPI } from "@/types";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <PlanetsList page={1} />
    </>
  )
}