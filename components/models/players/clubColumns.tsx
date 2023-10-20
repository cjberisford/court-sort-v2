"use client"

import { Team } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Player = {
  id: number,
  name: string,
  club: any,
  teams: Array<Team>
}

export const clubColumns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "teams",
    header: "Teams",
  }
]