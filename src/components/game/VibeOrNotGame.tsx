import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import GameInterface from "./GameInterface";

export default function VibeOrNotGame() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
  };

  if (!gameStarted) {
    return <WelcomeScreen onStartGame={handleStartGame} />;
  }

  return <GameInterface onBackToMenu={handleBackToMenu} />;
}