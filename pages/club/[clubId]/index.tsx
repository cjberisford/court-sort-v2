import React from 'react';
import { useSession } from 'next-auth/react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageHeader from '../../../components/ui/page-header';
import Layout from '../../../components/Layout';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import Map from '../../../components/Map';
import LoadingIndicator from '../../../components/ui/loading-indicator';
import MatchList from '../../../components/MatchList';
import { ClubProps } from '../../../components/models/Club';
import { clubColumns } from '../../../components/models/players/clubColumns';
import { DataTable } from '../../../components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const club = await prisma.club.findUnique({
    where: {
      id: Number(params?.clubId),
    },
    include: {
      teams: true,
      league: true,
      players: true
    }
  })

  // Find upcoming matches for all teams
  // Get all team IDs to retrieve all matches for each team
  const clubTeamIds = club.teams.map(team => team.id)
  const matches = await prisma.match.findMany({
    where: {
      AND: [
        {
          date: { gte: new Date() }
        },
        {
          OR: [
            {
              homeTeamId: {
                in: clubTeamIds
              },
            },
            {
              awayTeamId: {
                in: clubTeamIds
              }
            }
          ]
        }
      ]
    },
    include: {
      home_team: true,
      away_team: true
    },
    orderBy: {
      date: 'asc',
    },
  })

  const data = {
    club: club,
    matches: JSON.parse(JSON.stringify(matches)),
  }

  return {
    props: data,
  };
};

// async function publishPost(id: string): Promise<void> {
//   await fetch(`/api/publish/${id}`, {
//     method: 'PUT',
//   });
//   await Router.push('/');
// }

// async function deletePost(id: string): Promise<void> {
//   await fetch(`/api/post/${id}`, {
//     method: 'DELETE',
//   });
//   Router.push('/');
// }

type Props = {
  data: Object[]
}

const Club: React.FC<Props> = (props) => {

  const { data: session, status } = useSession();
  // const userHasValidSession = Boolean(session);
  // const postBelongsToUser = session?.user?.email === props.author?.email;

  const tableData = []
  props.club.players.map((playerData) => {
    const teamNames = props.club.teams?.map((team) => team.name)
    const playerObject = {
      id: playerData.id,
      name: playerData.name,
      teams: teamNames
    }
    tableData.push(playerObject)
  })

  return (
    <Layout>
      <Breadcrumbs pageAlias={props.club.name}></Breadcrumbs>
      {status === 'loading' ?
        (
          <LoadingIndicator />)
        :
        (
          <>
            <PageHeader title={props.club.name} subtitle={props.club.league.name} />
            {/* Fix Map
            <Map address="Queen Elizabeth Girl's School" /> */}
            {/* <ul>
              <li>Club teams</li>
              <li>Latest results from teams + give division info in</li>
              <li>Players</li>
              <li>Club information</li>
              <li>Club session data</li>
              <li>Socials</li>
            </ul> */}

            <Tabs defaultValue="account" className="w-full mb-12">
              <TabsList>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="info">Make changes to your account here.</TabsContent>
              <TabsContent value="players"><DataTable data={tableData} columns={clubColumns} /></TabsContent>
            </Tabs>
            <PageHeader title={""} subtitle={"Upcoming Fixtures"} />
            <MatchList matches={props.matches} context={props.club} />
          </>)
      }


    </Layout>
  );
};

export default Club;