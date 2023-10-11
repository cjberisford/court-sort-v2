import React from "react";

export type PlayerProps = {
  id: number;
  name: string;
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
