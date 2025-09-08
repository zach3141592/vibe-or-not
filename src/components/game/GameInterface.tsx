import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Real website data from your database
const websiteData = [
  { id: 1, url: "https://www.lucasjin.ca/", isVibe: false, name: "Lucas Jin" },
  { id: 2, url: "https://danielzh.dev", isVibe: false, name: "Daniel Zhang" },
  { id: 3, url: "https://www.jeffreyzang.com/", isVibe: false, name: "Jeffrey Zang" },
  { id: 4, url: "https://weinstein.vercel.app/", isVibe: false, name: "Weinstein" },
  { id: 5, url: "https://www.danielcwq.com/", isVibe: false, name: "Daniel Chew" },
  { id: 6, url: "https://dhruvbhatia0.github.io/personal_website/", isVibe: false, name: "Dhruv Bhatia" },
  { id: 7, url: "https://emilyqi.com/", isVibe: false, name: "Emily Qi" },
  { id: 8, url: "https://www.shanechen.ca/", isVibe: false, name: "Shane Chen" },
  { id: 9, url: "https://zhaju.github.io/", isVibe: false, name: "Zhaju" },
  { id: 10, url: "https://mark123m.github.io/portfolio/", isVibe: false, name: "Mark M" },
  { id: 11, url: "https://jellyfish-app-ys6jx.ondigitalocean.app/", isVibe: false, name: "Jellyfish App" },
  { id: 12, url: "https://hack404.dev/", isVibe: false, name: "Hack404" },
  { id: 13, url: "https://hackthe6ix.com/", isVibe: false, name: "HackThe6ix" },
  { id: 14, url: "https://winstonzhao.ca/", isVibe: false, name: "Winston Zhao" },
  { id: 15, url: "https://afaqvirk.com/", isVibe: true, name: "Afaq Virk" },
  { id: 16, url: "https://synopsis-sigma.vercel.app/", isVibe: true, name: "Synopsis" },
  { id: 17, url: "https://www.axiomstartups.ca/index.html#info-section", isVibe: true, name: "Axiom Startups" },
  { id: 18, url: "https://3e8robotics.com/", isVibe: true, name: "3E8 Robotics" },
  { id: 19, url: "https://www.matthewyang.ca", isVibe: true, name: "Matthew Yang" },
  { id: 20, url: "https://www.villio.ai/", isVibe: true, name: "Villio AI" },
  { id: 21, url: "https://www.hjcautomation.com/", isVibe: true, name: "HJC Automation" },
  { id: 22, url: "https://www.matthew-mo.com/", isVibe: true, name: "Matthew Mo" },
  { id: 23, url: "https://reprompt-that.vercel.app", isVibe: true, name: "Reprompt That" },
  { id: 24, url: "https://kurtispersonalwebsite.vercel.app/", isVibe: true, name: "Kurtis Personal" },
  { id: 25, url: "https://www.sweatfree.co/?srsltid=AfmBOor0FwaknPV-ov_R8TTUKurj8rJ61DKGSkGNkCAPrOHZkYWn_uNP", isVibe: false, name: "Sweat Free" },
  { id: 26, url: "https://ddxnm1.onrender.com/index.html", isVibe: false, name: "ddxnm" },
  { id: 27, url: "https://varun.ch/", isVibe: false, name: "Varun Biniwale" },
  { id: 28, url: "https://cristianodasilvaportfolio.weebly.com/", isVibe: false, name: "Cristiano Da Silva" },
  { id: 29, url: "https://awesomethan.github.io/personal-website/#/", isVibe: false, name: "Ethan Wang" },
  { id: 30, url: "http://martinsit.ca/", isVibe: false, name: "Martin Sit" },
  { id: 31, url: "https://www.casperdong.info/", isVibe: true, name: "Casper Dong" },
  { id: 32, url: "https://solderable.dev/", isVibe: true, name: "Solderable" },
  { id: 33, url: "https://www.contractual.ca/", isVibe: true, name: "Contractual" },
  { id: 34, url: "https://www.ibrahimkhawar.com/", isVibe: false, name: "Ibrahim Khawar" },
  { id: 35, url: "https://ivanliu.net/?fbclid=PAZXh0bgNhZW0CMTEAAacRcHXMd7Y_82M1mvfJDD8FLpW4uOnN1ZX64Zrpj8KixPTgRrIJdtheETnK8g_aem_R5MVfoafBBRk_dOtDCJpoQ", isVibe: false, name: "Ivan Liu" },
  { id: 36, url: "https://www.krishivthakuria.com/", isVibe: false, name: "Krish Thakuria" },
  { id: 37, url: "https://moulikbudhiraja.com/", isVibe: false, name: "Moulik Budhiraja" },
];

interface GameState {
  score: number;
  lives: number;
  currentSite: typeof websiteData[0] | null;
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
    const availableSites = websiteData.filter(site => site.id !== gameState.currentSite?.id);
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
          title: "Game Over 💀",
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
              Vibed or Not
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
          <div className="grid gap-4">
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
            <div className="flex gap-4 justify-center animate-slide-up mb-32">
              <Button
                onClick={() => handleVote(false)}
                size="lg"
                className="bg-gradient-not-vibe hover:bg-gradient-not-vibe/90 text-not-vibe-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Not Vibed 👎
              </Button>
              
              <Button
                onClick={() => handleVote(true)}
                size="lg"
                className="bg-gradient-vibe hover:bg-gradient-vibe/90 text-vibe-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Vibed 👍
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
