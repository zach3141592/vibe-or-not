import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demo - this will be replaced with Supabase data
const mockSites = [
  { id: 1, url: "https://stripe.com", isVibe: true, name: "Stripe" },
  { id: 2, url: "https://linear.app", isVibe: true, name: "Linear" },
  { id: 3, url: "https://vercel.com", isVibe: true, name: "Vercel" },
  { id: 4, url: "https://github.com", isVibe: true, name: "GitHub" },
  { id: 5, url: "https://figma.com", isVibe: true, name: "Figma" },
  { id: 6, url: "https://example.com", isVibe: false, name: "Example" },
];

interface GameState {
  score: number;
  lives: number;
  currentSite: typeof mockSites[0] | null;
  gameOver: boolean;
  streak: number;
}

interface GameInterfaceProps {
  onBackToMenu?: () => void;
}

export default function GameInterface({ onBackToMenu }: GameInterfaceProps) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    currentSite: null,
    gameOver: false,
    streak: 0,
  });

  const getRandomSite = () => {
    const availableSites = mockSites.filter(site => site.id !== gameState.currentSite?.id);
    return availableSites[Math.floor(Math.random() * availableSites.length)];
  };

  const startNewGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      currentSite: getRandomSite(),
      gameOver: false,
      streak: 0,
    });
  };

  const handleVote = (userVote: boolean) => {
    if (!gameState.currentSite || gameState.gameOver) return;

    const isCorrect = userVote === gameState.currentSite.isVibe;
    
    if (isCorrect) {
      const newScore = gameState.score + 10 + (gameState.streak * 2);
      const newStreak = gameState.streak + 1;
      
      setGameState(prev => ({
        ...prev,
        score: newScore,
        streak: newStreak,
        currentSite: getRandomSite(),
      }));

      toast({
        title: "Correct! 🎉",
        description: `+${10 + (gameState.streak * 2)} points ${newStreak > 1 ? `(${newStreak}x streak!)` : ''}`,
        className: "bg-gradient-vibe border-vibe",
      });
    } else {
      const newLives = gameState.lives - 1;
      
      if (newLives <= 0) {
        setGameState(prev => ({
          ...prev,
          lives: 0,
          gameOver: true,
          streak: 0,
        }));
        
        toast({
          title: "Game Over! 💀",
          description: `Final score: ${gameState.score}`,
          variant: "destructive",
        });
      } else {
        setGameState(prev => ({
          ...prev,
          lives: newLives,
          streak: 0,
          currentSite: getRandomSite(),
        }));

        toast({
          title: "Wrong! 😵",
          description: `${newLives} ${newLives === 1 ? 'life' : 'lives'} remaining`,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  if (gameState.gameOver) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow">
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Game Over!
            </h1>
            <p className="text-muted-foreground">You've used all your lives</p>
          </div>
          
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-2xl font-bold text-foreground">Final Score</p>
            <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {gameState.score}
            </p>
          </div>

          <Button 
            onClick={startNewGame}
            variant="default"
            size="lg"
            className="bg-gradient-vibe hover:bg-gradient-vibe/90 text-vibe-foreground font-semibold"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="p-4 bg-background/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vibe or Not
            </h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Score: {gameState.score}
            </Badge>
            {gameState.streak > 1 && (
              <Badge variant="default" className="bg-gradient-vibe text-vibe-foreground animate-pulse-glow">
                <Zap className="mr-1 h-3 w-3" />
                {gameState.streak}x Streak
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: gameState.lives }).map((_, i) => (
              <Heart key={i} className="h-5 w-5 text-destructive fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="p-4 max-w-4xl mx-auto">
        {gameState.currentSite && (
          <div className="grid gap-6">
            {/* Website Preview */}
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 shadow-card animate-fade-in">
              <div className="p-4 bg-background/50 border-b border-border">
                <p className="text-sm text-muted-foreground">Rate this website:</p>
                <h2 className="text-lg font-semibold text-foreground">{gameState.currentSite.name}</h2>
              </div>
              
              <div className="aspect-video">
                <iframe
                  src={gameState.currentSite.url}
                  className="w-full h-full"
                  title={`Preview of ${gameState.currentSite.name}`}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </Card>

            {/* Voting Buttons */}
            <div className="flex gap-4 justify-center animate-slide-up">
              <Button
                onClick={() => handleVote(false)}
                size="lg"
                className="bg-gradient-not-vibe hover:bg-gradient-not-vibe/90 text-not-vibe-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Not Vibe 👎
              </Button>
              
              <Button
                onClick={() => handleVote(true)}
                size="lg"
                className="bg-gradient-vibe hover:bg-gradient-vibe/90 text-vibe-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Vibe ✨
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}