import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { PlayerProps } from '../../components/models/Player';
import prisma from '../../lib/prisma';

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
    "Club": 0,
    "Best Partnership": "Dan Fan",
    "Honours": 0
  }

  console.log(stats)
  return (
    <Layout>
      <div className="grid gap-4 ">
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {props.name}
        </div>
        <div className="max-w-5xl grid gap-2 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.entries(stats).map(([key, stat]) => {
            return (
              <div key={key} className="xs:h-auto xs:square bg-gradient-to-tr from-gray-900 to-gray-600 bg-gradient-to-r text-center aspect-square text-dark p-2">
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
        <h2 className="text-4xl font-bold ">Match History</h2>
        <div className="flex flex-col overflow-y-scroll">
          <div className="flex h-full items-center justify-center py-4 bg-gray-600 rounded-md ">
            <a href="#">
              <div className="items-center align-middle">
                Ossett A v Ossett B
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block">W</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout >
  );
};

export default Player;