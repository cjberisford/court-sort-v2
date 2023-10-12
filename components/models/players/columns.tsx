"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Player = {
  id: number,
  name: string,
  club: any
}

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "club",
    header: "Club",
  }
]