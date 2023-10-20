import React from "react";

export type TeamProps = {
  id: number;
  name: string;
};

const Team: React.FC<{ team: TeamProps }> = ({ team }) => {
  return (
    <>
      {team.name}
    </>
  );
};

export default Team;
