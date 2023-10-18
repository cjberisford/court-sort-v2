import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../../../components/Layout';
import { PlayerProps } from '../../../../components/models/Player';
import prisma from '../../../../lib/prisma';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import MatchList from '../../../../components/MatchList';
import PageHeader from '../../../../components/ui/page-header';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  // Get the player by ID and find all their associated teams


  // Get the player by ID and return games they're involed in
  const player = await prisma.player.findUnique({
    where: {
      id: Number(params?.playerId),
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
    "Coefficient": 0,
    "Club": props.playerObject.club.name,
    "Best Partnership": "Dan Fan",
    "Honours": 0
  }

  const crumbs = {

  }

  return (
    <Layout>
      <Breadcrumbs customCrumbs={[["Ossett Badminton Club", "/club/1"], ["Players", "/club/1/players"]]}></Breadcrumbs>
      <PageHeader title={props.playerObject.name} subtitle={stats.Club} />
      <div className="grid grid-cols-1 mb-8">
        <div className="grid grid-cols-5">
          {Object.entries(stats).map(([key, stat]) => {
            return (
              <div key={key} className="border-[1px] border-primary grid  aspect-square hover:bg-primary text-primary hover:text-foreground m-2">
                <div className="flex w-full justify-center text-center">
                  <div className="m-auto">
                    <div className="py-2 text-foreground">
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
      <PageHeader title={""} subtitle={"Recent Matches"} />
      <MatchList matches={props.matchData} context={props.playerObject} className="h-[200px]" />

    </Layout >
  );
};

export default Player;