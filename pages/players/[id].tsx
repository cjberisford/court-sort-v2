import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { PlayerProps } from '../../components/models/Player';
import prisma from '../../lib/prisma';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../components/ui/button';
import Breadcrumbs from '../../components/Breadcrumbs';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const player = await prisma.player.findUnique({
    where: {
      id: Number(params?.id)
    }
  });
  return {
    props: player,
  };
};

const Player: React.FC<PlayerProps> = (props) => {

  console.log(props)
  const stats = {
    "Games Played": 0,
    "Games Won": 0,
    "Win Percentage": `0%`,
    "Ranking": 0,
    "Club": "Ossett Badminton Club",
    "Best Partnership": "Dan Fan",
    "Honours": 0
  }

  console.log(stats)
  return (
    <Layout>
      <Breadcrumbs playerName={props.name}></Breadcrumbs>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-4">
        <div>
          <h1 className="mb-4 text-3xl text-primary font-medium leading-none tracking-tight ">
            {props.name}
          </h1>
          <h2 className="text-2xl">{stats["Club"]}</h2>
        </div>
        <div>
          <div>
            <h2 className="text-xl pb-4">Match History</h2>
          </div>
          <ScrollArea className="h-[180px] w-full rounded-md border">
            <div className="flex flex-col grow rounded-md w-full">
              <div className="grow">
                <Button variant="outline" className="w-full">
                  Ossett A v Ossett B
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  Ossett A v Ossett B
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
                </Button>
              </div>

              <div className="grow">
                <Button variant="outline" className="w-full">
                  Ossett A v Ossett B
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  Ossett A v Ossett B
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
                </Button>
              </div>
              <div className="grow">
                <Button variant="outline" className="w-full">
                  Ossett A v Ossett B
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  Ossett A v Ossett B
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
                </Button>
              </div>

            </div>
          </ScrollArea>

        </div>
      </div>
      <div className="grid gap-4 my-4">

        <div className="flex flex-wrap">
          {Object.entries(stats).map(([key, stat]) => {
            return (
              <div key={key} className="border border-primary text-center w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 aspect-square">
                <div className="flex h-full items-center justify-center">
                  <div className="m-auto">
                    <div className="py-2 font-bold">
                      {key}
                    </div>
                    <div className={typeof stat === "string" && key !== "Win Percentage" ? "text-2xl font-bold" : "text-4xl font-bold"}>
                      {stat}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </Layout >
  );
};

export default Player;