import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma';
import { PlayerProps } from "../components/models/Player";
import { useRouter } from 'next/router'
import { columns } from "../components/models/players/columns";
import { DataTable } from "../components/ui/data-table";
import Breadcrumbs from "../components/Breadcrumbs";

export const getStaticProps: GetStaticProps = async () => {
  const players = await prisma.player.findMany({
    include: {
      club: true
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

  const tableData = []

  props.players.map((playerData) => {
    const playerObject = {
      id: playerData.id,
      name: playerData.name,
      club: playerData.club.name
    }
    tableData.push(playerObject)
  })

  const router = useRouter();

  return (

    <Layout >
      <Breadcrumbs />
      <DataTable data={tableData} columns={columns} />
    </Layout >
  )
}

export default Players
