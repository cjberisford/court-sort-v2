import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../../../components/Layout';
import { PlayerProps } from '../../../../components/models/Player';
import prisma from '../../../../lib/prisma';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import MatchList from '../../../../components/MatchList';
import PageHeader from '../../../../components/ui/page-header';
import { Match } from '@prisma/client';
import { useSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

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
      club: true
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
      },
      games: {
        include: { home_players: true, away_players: true },
        where: {
          matchId: { in: matchIds }
        }
      }
    }
  })

  // Filter matches into two lists, played and upcoming

  const playerData = {
    playerObject: JSON.parse(JSON.stringify(player)),
    matchData: JSON.parse(JSON.stringify(matches)),
    upcomingMatchData: [], // TODO: update
  }

  return {
    props: playerData
  };
};

type Props = {
  matchData: Array<Match>,
  upcomingMatchData: Array<Match>,
  playerObject: PlayerProps,
};


const Player: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  const stats = {
    "Matches Played": props.matchData.length,
    "Matches Won": 2,
    "Win Percentage": 2 / props.matchData.length * 100 + "%",
    "Coefficient": 0,
    "Club": props.playerObject.club.name,
    "Best Partnership": "Dan Fan",
    "Honours": 0
  }

  const crumbs = [
    [`${props.playerObject.club.name}`, `/club/${props.playerObject.club.id}`],
    [`Players`, `/club/${props.playerObject.club.id}/players`]
  ]

  return (

    <Layout>
      <Breadcrumbs customCrumbs={crumbs}></Breadcrumbs>

      {status !== 'loading' ?
        <div>
          <PageHeader title={props.playerObject.name} subtitle={stats.Club} />
          <div className="grid grid-cols-1 mb-8">
            <div className="grid grid-cols-5">
              {Object.entries(stats).map(([key, stat]) => {
                return (
                  <div key={key} className="border-[1px] border-primary grid aspect-square hover:bg-primary text-primary hover:text-foreground m-2 bg-gradient-to-br from-background from-60% to-foreground/10 backdrop-blur-sm hover:from-primary hover:to-primary">
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
          <MatchList matches={props.matchData} context={props.playerObject} className="h-[200px] mb-10" />
          <PageHeader title={""} subtitle={"Upcoming Matches"} />
          <MatchList matches={props.upcomingMatchData} context={props.playerObject.club} className="h-[200px] mb-10" />
        </div>
        :
        <div>Loading...</div>
      }
    </Layout >
  );
};

export default Player;