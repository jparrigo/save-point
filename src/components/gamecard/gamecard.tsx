import React from "react";

type GameCardProps = {
  title: string;
  image: string;
  onClick?: () => void;
};

const GameCard: React.FC<GameCardProps> = ({ image, onClick }) => {
  return (
    <div className="flex-shrink-0 w-[200px] p-8">
      <div
        className="rounded-2xl shadow-xl overflow-hidden w-64 h-80 cursor-pointer hover:scale-105 transition-transform bg-white hover:shadow-[0_0_20px_#a855f7]"
        onClick={onClick}
      >
        <img
          src={image}
          alt="Game cover"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default GameCard;
