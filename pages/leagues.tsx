import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma';
import { LeagueProps } from "../components/models/League";
import { Button } from "../components/ui/button";
import { ThemeProvider } from "../components/theme-provider";


export const getStaticProps: GetStaticProps = async () => {
  const leagues = await prisma.league.findMany()
  return {
    props: { leagues },
    revalidate: 10,
  };
};

type Props = {
  leagues: LeagueProps[]
}

const Leagues: React.FC<Props> = (props) => {
  console.log(props.leagues)
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      < Layout >
        <div className="page">
          <h1 className="text-4xl">Registered Leagues</h1>

          {props.leagues.map((league) => (
            <div key={league.id}>
              <Button>
                {league.name}
                {/* <h2 className="text-2xl">{league.name}</h2> */}
              </Button>
            </div>
          ))}
        </div>
      </Layout >


    </ThemeProvider>



  )
}

export default Leagues
