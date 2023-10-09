import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PlayerProps = {
  id: string;
  name: string;
  clubs: [];
  teams: [];
  games_played: number;
  win_count: number;
  coefficient: number;
};

const Player: React.FC<{ player: PlayerProps }> = ({ player }) => {

  return (
    <>
      This is the component view for
      {player.name}
    </>
  );
};

export default Player;
