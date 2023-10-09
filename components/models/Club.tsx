import React from "react";

export type ClubProps = {
  id: string;
  name: string;
};

const Post: React.FC<{ club: ClubProps }> = ({ club }) => {
  return (
    <>
      This is the component view for
      {club.name}
    </>
  );
};

export default Post;
