import React, { ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

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

const isHomeWin = (match, context) => {
  let victory = match.home_rubbers > match.away_rubbers

  // Check if player is member of away team
  if (!isHomeTeam(match, context)) {
    victory = !victory
  }
  return victory
}

const parseDate = (dateString) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);

  return (<div>
    {date.toLocaleDateString('en-uk', options)}
  </div>)
}
const resultSymbol = (match, context) => {
  let victory = match.home_rubbers > match.away_rubbers

  // Check if player is member of away team
  if (!isHomeTeam(match, context)) {
    victory = !victory
  }
  return (
    <span className={`ml-2 ${victory ? "w-[25px] bg-green-600 text-green-200 dark:bg-green-800" : "w-[25px] bg-red-600 text-red-200 dark:bg-red-800"} text-xs font-medium mr-2 py-0.5 rounded inline-block`}>
      {victory ? <span>W</span> : <span>L</span>}
    </span>
  )
}

const MatchList: React.FC<Props> = (props) => {
  return (
    <ScrollArea className={`${props.className} w-full rounded-md border`} >
      {props.matches.map((match) => {
        return (
          <Accordion className="w-full" type="single" collapsible>
            <AccordionItem value={match.id}>
              <AccordionTrigger>
                <div className="relative z-0 flex justify-center">
                  <Button variant="outline" size="xl" className="w-full p-0 pb-2 h-[70px] align-middle overflow-clip flex items-center" >
                    <div className="grid w-full flex">
                      <div className={`bg-gradient-to-r from-background from-80% ${!isHomeWin(match, props.context) ? "to-red-800/25 dark:to-red-800/50" : "to-green-600/25 dark:to-green-800/25"} p-0 m-0 text-right`}>
                        <span className="h-full text-9xl font-extrabold opacity-[2%] overflow-clip">{!isHomeWin(match, props.context) ? "LOSS" : "WIN"}</span>

                      </div>
                    </div>
                  </Button>
                  <div className="absolute inset-y z-10 w-full h-full text-foreground/75 flex hover:bg-muted/25 justify-center">
                    <div className="grid grid-cols-3 w-1/2 flex items-center ">
                      <span className={`${isHomeTeam(match, props.context) ? "font-bold" : "dark:font-extralight"} uppercase text-2xl`} >{match.home_team.name}</span>
                      <div className="text-4xl font-extralight">
                        <span className={`${isHomeTeam(match, props.context) ? "font-bold" : "dark:font-extralight"} text-right`}> {match.home_rubbers}</span>
                        <span className="px-3">-</span>
                        <span className={`${!isHomeTeam(match, props.context) ? "font-bold" : "dark:font-extralight"} text-left"`}>{match.away_rubbers}</span>
                      </div>
                      <span className={`${isHomeTeam(match, props.context) ? "dark:font-extralight" : "font-bold"} uppercase text-2xl`} >{match.away_team.name}</span>
                    </div>

                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="m-1" key={match.id}>
                  <span className="text-primary">    {String(match.division?.name)}</span>
                  {parseDate(match.date)}
                  <h1>{match.venue}</h1>
                  {match.games.map(game => {
                    return (<div>
                      <span>{game.home_players[0].name}{game.home_players[1].name}{game.home_points}</span>
                      <span>{game.away_players[0].name}{game.away_players[1].name}{game.away_points}</span>
                    </div>)
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </ScrollArea >
  )
}


export default MatchList;

