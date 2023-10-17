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
      division: {
        select: { id: true, name: true },
      }
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

  const stats = {
    "Matches Played": props.matchData.length,
    "Matches Won": 2,
    "Win Percentage": 2 / props.matchData.length * 100 + "%",
    "Ranking": 0,
    "Club": props.playerObject.club.name,
    "Best Partnership": "Dan Fan",
    "Honours": 0
  }

  return (
    <Layout>
      <Breadcrumbs pageAlias={props.playerObject.name}></Breadcrumbs>
      <div className="flex justify-between pt-2">
        <div>
          <span className="text-6xl text-foreground/75 font-extralight leading-none tracking-tight">{props.playerObject.name}</span>
        </div>
        <div className=" flex items-end">
          <span className="text-5xl text-primary/75 uppercase font-bold flex-end inline-block align-bottom"> {stats.Club}</span>
        </div>
      </div>
      <div className="h-[2px] p-0 m-0 bg-gradient-to-r from-primary to-transparent mb-8"></div>
      <div className="grid grid-cols-1 divide-y mb-8">
        <div className="grid grid-cols-5 divide-x">
          {Object.entries(stats).map(([key, stat]) => {
            return (
              <div key={key} className="border border-primary grid divide-x aspect-square hover:bg-primary text-primary hover:text-foreground m-4">
                <div className="flex w-full justify-center text-center">
                  <div className="m-auto">
                    <div className="py-2 uppercase text-extralight">
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
      </div >
      <div className="flex justify-end">
        <div className=" flex items-end">
          <span className="text-5xl text-primary/75 uppercase font-bold flex-end inline-block align-bottom font-outline-foreground">Recent Matches</span>
        </div>
      </div>
      <div className="h-[2px] p-0 m-0 bg-gradient-to-r from-primary to-transparent"></div>
      <MatchList matches={props.matchData} context={props.playerObject} className="h-[200px]" />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 pt-4"> 
        <div>


          <h2 className="text-2xl">{stats["Club"]}</h2>
          <ul>
            <li>
              List of teams player belongs to
            </li>
            <li>PLayer statistics</li>
            <li>Rececnt matches</li>
          </ul>
          <div className="flex flex-wrap">
            {Object.entries(stats).map(([key, stat]) => {
              return (
                <div key={key} className="border border-primary text-center w-1 md:w-1/2 lg:w-1/3 aspect-square">
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
        <div>
          <div>
            <h2 className="text-xl mb-4 font-extralight uppercase border-b-2 border-primary text-right">Recent Matches</h2>
            <MatchList matches={props.matchData} context={props.playerObject} className="h-[200px]" />
          </div>
        </div>
      </div>
          */}


    </Layout >
  );
};

export default Player;