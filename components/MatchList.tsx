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
    <span className={`ml-2 ${victory ? "w-[25px] bg-green-600 text-green-200 dark:bg-green-800" : "w-[25px] bg-red-600 text-red-200 dark:bg-red-800"} text-xs font-medium mr-2 py-0.5 rounded inline-block`}>
      {victory ? <span>W</span> : <span>L</span>}
    </span>
  )
}

const MatchList: React.FC<Props> = (props) => (
  // <ScrollArea className={`h-[] w-full rounded-md border"`} >
  <ScrollArea className={`${props.className} w-full rounded-md border`} >
    {/* {
      props.matches.map((match) => {
        return (
          <div className="m-1">
            <Button variant="outline" size="xl" className="w-full ">
              <div className="grid grid-col-1">
                <div>
                  <span className={isHomeTeam(match, props.context) ? "font-extrabold" : "dark:font-extralight"}>{match.home_team.name}</span>
                  <span className="px-2">v</span>
                  <span className={isHomeTeam(match, props.context) ? "dark:font-extralight" : "font-extrabold"}>{match.away_team.name}</span>
                  {resultSymbol(match, props.context)}
                </div>
                <span className="text-primary">    {String(match.division?.name)}</span>
              </div>
            </Button>

          </div>
        )
      })
    } */}
    {
      props.matches.map((match) => {
        return (
          // <div className="m-1" key={match.id}>
          //   <Button variant="outline" size="xl" className="w-full ">
          //     <div className="grid grid-col-1">
          //       <div>
          //         <span className={isHomeTeam(match, props.context) ? "font-extrabold" : "dark:font-extralight"}>{match.home_team.name}</span>
          //         <span className="px-2">v</span>
          //         <span className={isHomeTeam(match, props.context) ? "dark:font-extralight" : "font-extrabold"}>{match.away_team.name}</span>
          //         {resultSymbol(match, props.context)}
          //       </div>
          //       <span className="text-primary">    {String(match.division?.name)}</span>
          //     </div>
          //   </Button>

          // </div>
          <div className="m-1" key={match.id}>
            <Button variant="outline" size="xl" className="w-full p-0 pb-2 h-[55px] align-middle overflow-clip flex items-center">
              <div className="grid grid-cols-2 w-full flex">
                <div className="bg-gradient-to-r from-green-600/25 dark:bg-green-800/25 to-40% to-background text-left">
                  <span className="h-full text-9xl font-extrabold opacity-[2%] overflow-clip">WIN</span>

                </div>
                <div className="bg-gradient-to-r from-background from-60% to-red-800/25 dark:to-red-800/50 p-0 m-0 text-right">
                  <span className="h-full text-9xl font-extrabold opacity-[2%] overflow-clip">LOSE</span>

                </div>


                {/* <span className="px-2">v</span> */}

                {/* {resultSymbol(match, props.context)} */}

                {/* <span className="text-primary">    {String(match.division?.name)}</span> */}
              </div>
              <div className="absolute inset grid grid-cols-3 w-full text-foreground/75 flex items-center">
                <span className={`${isHomeTeam(match, props.context) ? "font-bold" : "dark:font-extralight"} uppercase text-2xl`} >{match.home_team.name}</span>
                <div className="text-4xl font-extralight">
                  <span className="text-right">{match.home_rubbers}</span>
                  <span>-</span>
                  <span className="text-left">{match.away_rubbers}</span>
                </div>
                <span className={`${isHomeTeam(match, props.context) ? "dark:font-extralight" : "font-extrabold"} uppercase text-2xl`} >{match.away_team.name}</span>

              </div>
            </Button>

          </div>
        )
      })
    }
  </ScrollArea >
)


export default MatchList;
