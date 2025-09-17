import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, RotateCcw, Trophy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  { id: 18, url: "https://www.grantou.com/", isVibe: false, name: "Grant Ou" },
  { id: 19, url: "https://www.matthewyang.ca", isVibe: true, name: "Matthew Yang" },
  { id: 20, url: "https://www.villio.ai/", isVibe: true, name: "Villio AI" },
  { id: 21, url: "https://www.hjcautomation.com/", isVibe: true, name: "HJC Automation" },
  { id: 22, url: "https://www.matthew-mo.com/", isVibe: true, name: "Matthew Mo" },
  { id: 23, url: "https://reprompt-that.vercel.app", isVibe: true, name: "Reprompt That" },
  { id: 24, url: "https://kurtispersonalwebsite.vercel.app/", isVibe: true, name: "Kurtis Personal" },
  { id: 25, url: "https://www.lohani.ca/", isVibe: true, name: "Pravin Lohani" },
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
  { id: 38, url: "https://suneru.ca/", isVibe: false, name: "Suneru Perera" },
  { id: 39, url: "https://www.krishgarg.ca/", isVibe: false, name: "Krish Garg" },
  { id: 40, url: "https://www.aayanrahman.me/", isVibe: true, name: "Aayan Rahman" },
  { id: 41, url: "https://www.lanceyan.tech/", isVibe: false, name: "Lance Yan" },
  { id: 42, url: "https://www.noahbarbaros.com/", isVibe: true, name: "Noah Barbaros" },
  { id: 43, url: "https://jame.li/", isVibe: false, name: "James Li" },
  { id: 44, url: "https://elrichchen.lovable.app/", isVibe: true, name: "Elrich Chen" },
  { id: 45, url: "https://austinjian.ca/", isVibe: false, name: "Austin Jian" },
  { id: 46, url: "https://aravmathur.vercel.app/", isVibe: false, name: "Arav Mathur" },
  { id: 46, url: "https://ayan-nalawade.vercel.app/", isVibe: true, name: "Ayan Nalawade" },
  { id: 47, url: "https://virk-arjun.github.io/", isVibe: false, name: "Arjun Virk" },
  { id: 48, url: "https://rizzable.vercel.app/", isVibe: true, name: "Rizzable" },
  { id: 49, url: "https://owenchen07.github.io/", isVibe: true, name: "Owen Chen" },
  { id: 50, url: "https://jashan.vercel.app/", isVibe: false, name: "Jashan Singh" },
  { id: 51, url: "https://www.williamcielen.com/", isVibe: false, name: "William Cielen" },
  { id: 52, url: " https://thebityard.org/", isVibe: false, name: "Ahoy-hoy" }, 
];

interface GameState {
  score: number;
  lives: number;
  currentSite: typeof websiteData[0] | null;
  gameOver: boolean;
  streak: number;
  usedSiteIds: number[];
  allSitesCompleted: boolean;
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
    usedSiteIds: [],
    allSitesCompleted: false,
  });


  const getRandomSite = () => {
    const availableSites = websiteData.filter(
      site => !gameState.usedSiteIds.includes(site.id)
    );
    
    if (availableSites.length === 0) {
      return null; // All sites have been used
    }
    
    return availableSites[Math.floor(Math.random() * availableSites.length)];
  };

  const startNewGame = () => {
    const newGameState = {
      score: 0,
      lives: 3,
      currentSite: null,
      gameOver: false,
      streak: 0,
      usedSiteIds: [],
      allSitesCompleted: false,
    };
    
    // Get the first site for the new game
    const availableSites = websiteData;
    const firstSite = availableSites[Math.floor(Math.random() * availableSites.length)];
    
    setGameState({
      ...newGameState,
      currentSite: firstSite,
      usedSiteIds: [firstSite.id],
    });
  };

  const handleVote = (userVote: boolean) => {
    if (!gameState.currentSite || gameState.gameOver || gameState.allSitesCompleted) return;

    const isCorrect = userVote === gameState.currentSite.isVibe;
    const nextSite = getRandomSite();
    
    if (isCorrect) {
      const newScore = gameState.score + 10 + (gameState.streak * 2);
      const newStreak = gameState.streak + 1;
      
      if (!nextSite) {
        // All sites completed!
        setGameState(prev => ({
          ...prev,
          score: newScore,
          streak: newStreak,
          allSitesCompleted: true,
          currentSite: null,
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          score: newScore,
          streak: newStreak,
          currentSite: nextSite,
          usedSiteIds: [...prev.usedSiteIds, nextSite.id],
        }));
      }

      toast({
        title: "Correct!",
        description: `+${10 + (gameState.streak * 2)} points ${newStreak > 1 ? `(${newStreak}x streak!)` : ''}`,
        className: "bg-gray-300 border border-black text-black",
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
          title: "Game Over",
          description: `Final score: ${gameState.score}`,
          variant: "destructive",
        });
      } else {
        if (!nextSite) {
          // All sites completed!
          setGameState(prev => ({
            ...prev,
            lives: newLives,
            streak: 0,
            allSitesCompleted: true,
            currentSite: null,
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            lives: newLives,
            streak: 0,
            currentSite: nextSite,
            usedSiteIds: [...prev.usedSiteIds, nextSite.id],
          }));
        }

        toast({
          title: "Wrong!",
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto bg-white border border-border shadow-card">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-black mb-2 font-serif">
              Game Over!
            </h1>
            <p className="text-gray-600">You've used all your lives</p>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 border-l-4 border-black">
            <p className="text-2xl font-bold text-black">Final Score</p>
            <p className="text-4xl font-bold text-black font-serif">
              {gameState.score}
            </p>
          </div>

          <Button 
            onClick={startNewGame}
            variant="default"
            size="lg"
            className="bg-black hover:bg-gray-800 text-white font-semibold border font-serif"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState.allSitesCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto bg-white border border-border shadow-card">
          <div className="mb-6">
            <Trophy className="h-16 w-16 text-black mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-black mb-2 font-serif">
              Congratulations!
            </h1>
            <p className="text-gray-600">You've rated all {websiteData.length} websites!</p>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 border-l-4 border-black">
            <p className="text-2xl font-bold text-black">Final Score</p>
            <p className="text-4xl font-bold text-black font-serif">
              {gameState.score}
            </p>
          </div>

          <Button 
            onClick={startNewGame}
            size="lg"
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold mb-4 border font-serif"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>

          <Button 
            onClick={onBackToMenu}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Back to Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 bg-card border-b-2 border-border">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground font-serif">
              Vibed or Not
            </h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Score: {gameState.score}
            </Badge>
            {gameState.streak > 1 && (
              <Badge variant="default" className="bg-primary text-primary-foreground border animate-pulse-glow">
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
            <Card className="overflow-hidden bg-card border border-border shadow-card">
              <div className="p-4 bg-muted border-b border-border">
                <p className="text-sm text-muted-foreground">determine if this site is vibe coded or not:</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{gameState.currentSite.name}</h2>
                  <Button
                    onClick={() => window.open(gameState.currentSite.url, '_blank')}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 hover:bg-muted-foreground/10"
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
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
            <div className="flex gap-4 justify-center mb-32">
              <Button
                onClick={() => handleVote(false)}
                size="lg"
                className="bg-not-vibe hover:bg-not-vibe/90 text-not-vibe-foreground font-semibold px-8 py-6 text-lg border transition-all duration-200 font-serif"
              >
                Not Vibed
              </Button>
              
              <Button
                onClick={() => handleVote(true)}
                size="lg"
                className="bg-vibe hover:bg-vibe/90 text-vibe-foreground font-semibold px-8 py-6 text-lg border transition-all duration-200 font-serif"
              >
                Vibed
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
