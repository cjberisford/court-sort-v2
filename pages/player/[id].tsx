import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { PlayerProps } from '../../components/models/Player';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const player = await prisma.player.findUnique({
    where: {
      id: String(params?.id)
    },
    include: {
      clubs: {
        select: { name: true },
      },
    },
  });
  return {
    props: player,
  };
};

const Player: React.FC<PlayerProps> = (props) => {

  console.log(props)
  const stats = {
    "Games Played": props.games_played,
    "Games Won": props.win_count,
    "Win Percentage": `${(props.win_count / props.games_played) * 100}%`,
    "Ranking": props.coefficient,
    "Club": Array.from(props.clubs)[0].name,
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
        <div className="max-w-5xl grid gap-4 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.entries(stats).map(([key, stat]) => {
            return (
              <div key={key} className="xs:h-auto xs:square rounded-lg bg-teal-400 text-center aspect-square">
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