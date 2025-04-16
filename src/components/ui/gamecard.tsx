import React from "react";

type GameCardProps = {
  title: string;
  image: string;
  onClick?: () => void;
};

const GameCard: React.FC<GameCardProps> = ({ image, onClick }) => {
  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden w-64 cursor-pointer hover:scale-105 transition-transform transition-shadow bg-white hover:shadow-[0_0_20px_#a855f7]"
      onClick={onClick}
    >
      <img
        src={image}
        alt="Game cover"
        className="w-full h-80 object-cover"
      />
    </div>
  );
};

export default GameCard;
