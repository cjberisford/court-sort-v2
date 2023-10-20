import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Match, Player } from "@prisma/client";

const isHomeTeam = (match, context) => {
  const teamIds = Array.from(context.teams.map(team => team.id))
  if (teamIds.includes(match.away_team.id)) {
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

const resultSymbol = (match, game, context) => {
  let victory = game.home_points > game.away_points

  // Check if player is member of away team
  if (!isHomeTeam(match, context)) {
    victory = !victory
  }
  return (
    <span className={`ml-2 ${victory ? "w-[25px] bg-green-600 text-green-200 dark:bg-green-800" : "w-[25px] bg-red-600 text-red-200 dark:bg-red-800"} text-xs font-medium mr-2 py-0.5 rounded inline-block text-center`}>
      {victory ? <span>W</span> : <span>L</span>}
    </span>
  )
}

const matchHeader = (match, context) => {
  return (
    <div className="relative z-0 flex justify-center">
      <Button variant="outline" size="xl" className="w-full p-0 pb-2 h-[70px] align-middle overflow-clip flex items-center" >
        <div className="grid w-full flex">
          <div className={`bg-gradient-to-r from-background from-80% ${!isHomeWin(match, context) ? "to-red-800/25 dark:to-red-800/50" : "to-green-600/25 dark:to-green-800/25"} p-0 m-0 text-right`}>
            <span className="h-full text-9xl font-extrabold opacity-[2%] overflow-clip">{!isHomeWin(match, context) ? "LOSS" : "WIN"}</span>
          </div>
        </div>
      </Button>
      <div className="absolute inset-y z-10 w-full h-full text-foreground/75 flex hover:bg-muted/25 justify-center">
        <div className="grid grid-cols-3 w-3/4 flex items-center ">
          <span className={`${isHomeTeam(match, context) ? "font-bold" : "dark:font-extralight"} uppercase text-2xl text-right`} >{match.home_team.name}</span>
          <div className="text-4xl font-extralight">
            <span className={`${isHomeTeam(match, context) ? "font-bold" : "dark:font-extralight"} text-right`}> {match.home_rubbers}</span>
            <span className="px-3">-</span>
            <span className={`${!isHomeTeam(match, context) ? "font-bold" : "dark:font-extralight"} text-left"`}>{match.away_rubbers}</span>
          </div>
          <span className={`${isHomeTeam(match, context) ? "dark:font-extralight" : "font-bold"} uppercase text-2xl text-left`} >{match.away_team.name}</span>
        </div>
      </div>
    </div>
  )
}

const fixtureHeader = (match, context) => {
  return (
    <div className="relative z-0 flex justify-center">
      <Button variant="outline" size="xl" className="w-full p-0 pb-2 h-[70px] align-middle overflow-clip flex items-center" >
        <div className="grid w-full flex">
          <div className={`bg-gradient-to-r from-background from-80% to-muted/25 dark:to-muted/50 p-0 m-0 text-right`}>
            <span className="h-full text-9xl font-extrabold opacity-[2%] overflow-clip">{isHomeTeam(match, context) ? "HOME" : "AWAY"} </span>
          </div>
        </div>
      </Button>
      <div className="absolute inset-y z-10 w-full h-full text-foreground/75 flex hover:bg-muted/25 justify-center">
        <div className="grid grid-cols-3 w-3/4 flex items-center ">
          <span className={`${isHomeTeam(match, context) ? "font-bold" : "dark:font-extralight"} uppercase text-2xl text-right`} >{match.home_team.name}</span>
          <div className="text-4xl font-extralight">
            {/* <span className={`${isHomeTeam(match, context) ? "font-bold" : "dark:font-extralight"} text-right`}> {match.home_rubbers}</span> */}
            <span className="px-3">vs</span>
            {/* <span className={`${!isHomeTeam(match, context) ? "font-bold" : "dark:font-extralight"} text-left"`}>{match.away_rubbers}</span> */}
          </div>
          <span className={`${isHomeTeam(match, context) ? "dark:font-extralight" : "font-bod"} uppercase text-2xl text-left`} >{match.away_team.name}</span>
        </div>
      </div>
    </div>
  )
}

const fixtureBody = (match, context) => {
  return (<div>{match.date}{match.venue}</div>)
}

const matchBody = (match, context) => {
  return (
    <div className="m-1 w-full text-sm font-medium flex flex-col justify-center" key={match.id}>
      <div className="w-3/4 mx-auto">
        {match.games.map(game => {
          return (
            <div className="grid grid-cols-3 py-4 flex flex-col justify-center">
              <div className="grid grid-cols-1 text-right">
                <div className="flex justify-end mb-2">
                  <div className="my-auto">{game.home_players[0].name}</div>
                  <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ml-2">
                    <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="my-auto">{game.home_players[1].name}</div>
                  <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ml-2">
                    <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                </div>
              </div>
              <div className="h-full flex justify-center items-center" >
                <div className="px-2 flex flex-col text-center">
                  <div>{resultSymbol(match, game, context)}</div>
                  <div className="text-lg">{game.home_points} - {game.away_points}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 text-left">
                <div className="flex mb-2">
                  <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
                    <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                  <div className="my-auto">{game.away_players[0].name}</div>
                </div>
                <div className="flex">
                  <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
                    <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                  <div className="my-auto">{game.away_players[1].name}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-center">
        <span className="text-primary">    {String(match.division?.name)}</span>
        <p><h1>{match.venue}</h1></p>
        <p>{parseDate(match.date)}</p>
      </div>
    </div>
  )
}

type Props = {
  matches: Array<Match>,
  context: Object,
  className: String
};

const MatchList: React.FC<Props> = (props) => {
  return (
    <ScrollArea className={`${props.className} w-full rounded-md border`} >
      <div>
        {
          props.matches.map((match) => {
            return (
              <Accordion className="w-full" type="single" collapsible>
                <AccordionItem value={String(match.id)}>
                  <AccordionTrigger>
                    {!props.context.venue ? matchHeader(match, props.context) : fixtureHeader(match, props.context)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {!props.context.venue ? matchBody(match, props.context) : fixtureBody(match, props.context)}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })
        }
      </div >
    </ScrollArea >
  )
}

export default MatchList;

