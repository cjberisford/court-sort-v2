import React from "react";

export type MatchProps = {
  id: number;
};

const Match: React.FC<{ match: MatchProps }> = ({ match }) => {
  return (
    <>
      This is the component view for
      {match.id}
    </>
  );
};

export default Match;
