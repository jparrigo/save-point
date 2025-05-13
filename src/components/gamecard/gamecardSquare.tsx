import React from "react";

type GameCardProps = {
  image: string;
  onClick?: () => void;
};

const GameCard: React.FC<GameCardProps> = ({ image, onClick }) => {
  return (
    <div className="flex-shrink-0 w-[300px] p-4">
      <div
        className="rounded-xl shadow-xl overflow-hidden w-40 h-40 cursor-pointer hover:scale-105 transition-transform bg-white hover:shadow-[0_0_20px_#a855f7]"
        onClick={onClick}
      >
        <img
          src={image}
          alt="Game cover"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default GameCard;

