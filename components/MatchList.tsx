import React, { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

type Props = {
  matches: Object,
  context: Object,
  className: String
};

const isHomeTeam = (match, context) => {
  const playerTeamIds = Array.from(context.teams.map(team => team.id))
  if (playerTeamIds.includes(match.away_team.id)) {
    return false
  }
  return true
}

const resultSymbol = (match, context) => {
  let victory = match.home_rubbers > match.away_rubbers

  // Check if player is member of away team
  if (!isHomeTeam(match, context)) {
    victory = !victory
  }
  return (
    <span className={`ml-2 ${victory ? "w-[25px] bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "w-[25px] bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"} text-xs font-medium mr-2 py-0.5 rounded inline-block`}>
      {victory ? <span>W</span> : <span>L</span>}
    </span>
  )
}

const MatchList: React.FC<Props> = (props) => (
  // <ScrollArea className={`h-[] w-full rounded-md border"`} >
  <ScrollArea className={`${props.className} w-full rounded-md border`} >
    {
      props.matches.map((match) => {
        return (
          <div>
            <Button variant="outline" className="w-full">
              <span className={isHomeTeam(match, props.context) ? "font-extrabold" : "font-extralight"}>{match.home_team.name}</span>
              <span className="px-4">v</span>
              <span className={isHomeTeam(match, props.context) ? "font-extralight" : "font-extrabold"}>{match.away_team.name}</span>
              {resultSymbol(match, props.context)}
            </Button>
          </div>
        )
      })
    }
  </ScrollArea >
)


export default MatchList;
