import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { PlayerProps } from '../../components/models/Player';
import prisma from '../../lib/prisma';
import Breadcrumbs from '../../components/Breadcrumbs';
import MatchList from '../../components/MatchList';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  // Get the player by ID and find all their associated teams


  // Get the player by ID and return games they're involed in
  const player = await prisma.player.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      home_games: {
        select: { id: true, home_points: true, matchId: true },
      },
      away_games: {
        select: { id: true, home_points: true, matchId: true },
      },
      teams: {
        select: { id: true, name: true },
      },
      club: {
        select: { id: true, name: true },
      }
    },
  });

  // Get unique match Ids from home and away games including team names
  let matchIds = []
  const all_games = player.home_games.concat(player.away_games)
  all_games.forEach((game) => matchIds.push(game.matchId))
  let uniqueMatchIds = Array.from(new Set(matchIds))

  const matches = await prisma.match.findMany({
    where: {
      id: {
        in: uniqueMatchIds,
      }
    },
    include: {
      home_team: {
        select: { id: true, name: true },
      },
      away_team: {
        select: { id: true, name: true },
      },
    }
  })

  const playerData = {
    playerObject: JSON.parse(JSON.stringify(player)),
    matchData: JSON.parse(JSON.stringify(matches))
  }

  return {
    props: playerData
  };
};

const Player: React.FC<PlayerProps> = (props) => {

  console.log(props.playerObject)

  const stats = {
    "Matches Played": props.matchData.length,
    "Matches Won": 2,
    "Win Percentage": props.matchData.length / 2 * 100 + "%",
    "Ranking": 0,
    "Club": props.playerObject.club.name + " Badminton Club",
    "Best Partnership": "Dan Fan",
    "Honours": 0
  }

  return (
    <Layout>
      <Breadcrumbs pageAlias={props.playerObject.name}></Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 pt-4">
        <div>
          <h1 className="mb-4 text-3xl text-primary font-medium leading-none tracking-tight ">
            {props.playerObject.name}
          </h1>
          <h2 className="text-2xl">{stats["Club"]}</h2>
        </div>
        <div>
          <div>
            <h2 className="text-xl pb-4">Match History</h2>
            <MatchList matches={props.matchData} context={props.playerObject} className="h-[200px]" />
          </div>
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