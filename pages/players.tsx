import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma';
import { PlayerProps } from "../components/models/Player";
import { useRouter } from 'next/router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

export const getStaticProps: GetStaticProps = async () => {
  const players = await prisma.player.findMany({
    include: {
      club: {
        select: { name: true },
      },
    },
  });
  return {
    props: { players },
    revalidate: 10,
  };
};

type Props = {
  players: PlayerProps[]
}

const Players: React.FC<Props> = (props) => {
  const router = useRouter();
  return (

    <Layout >
      <div className="page">
        <h1 className="text-4xl my-8">Players</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Club</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.players.map((player) => (
            <TableRow onClick={() => { router.push(`/players/${player.id}`) }} key={player.id}>
              <TableCell className="font-medium">{player.name}</TableCell>
              <TableCell>{player.club.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout >
  )
}

export default Players
