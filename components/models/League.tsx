import React from "react";

export type LeagueProps = {
  id: number;
  name: string;
};

const League: React.FC<{ league: LeagueProps }> = ({ league }) => {
  return (
    <>
      This is the component view for
      {league.name}
    </>
  );
};

export default League;
