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
  { id: 30, url: "https://thebityard.org/", isVibe: false, name: "Ahoy-hoy" },
  { id: 31, url: "https://www.casperdong.com/", isVibe: false, name: "Casper Dong" },
  { id: 32, url: "https://solderable.dev/", isVibe: true, name: "Solderable" },
  { id: 33, url: "https://www.contractual.ca/", isVibe: true, name: "Contractual" },
  { id: 34, url: "https://www.ibrahimkhawar.com/", isVibe: false, name: "Ibrahim Khawar" },
  { id: 35, url: "https://ivanliu.net/?fbclid=PAZXh0bgNhZW0CMTEAAacRcHXMd7Y_82M1mvfJDD8FLpW4uOnN1ZX64Zrpj8KixPTgRrIJdtheETnK8g_aem_R5MVfoafBBRk_dOtDCJpoQ", isVibe: false, name: "Ivan Liu" },
  { id: 36, url: "https://www.krishivthakuria.com/", isVibe: false, name: "Krish Thakuria" },
  { id: 37, url: "https://moulikbudhiraja.com/", isVibe: false, name: "Moulik Budhiraja" },
  { id: 38, url: "https://suneru.ca/", isVibe: false, name: "Suneru Perera" },
  { id: 39, url: "https://www.krishgarg.ca/", isVibe: false, name: "Krish Garg" },
  { id: 40, url: "https://www.aayanrahman.me/", isVibe: true, name: "Aayan Rahman" },
  { id: 41, url: "https://www.lanceyan.tech/", isVibe: true, name: "Lance Yan" },
  { id: 42, url: "https://www.noahbarbaros.com/", isVibe: true, name: "Noah Barbaros" },
  { id: 43, url: "https://jame.li/", isVibe: false, name: "James Li" },
  { id: 44, url: "https://elrichchen.lovable.app/", isVibe: true, name: "Elrich Chen" },
  { id: 45, url: "https://austinjian.ca/", isVibe: false, name: "Austin Jian" },
  { id: 46, url: "https://aravmathur.vercel.app/", isVibe: false, name: "Arav Mathur" },
  { id: 46, url: "https://ayan-nalawade.vercel.app/", isVibe: true, name: "Ayan Nalawade" },
  { id: 47, url: "https://virk-arjun.github.io/", isVibe: false, name: "Arjun Virk" },
  { id: 48, url: "https://rizzable.vercel.app/", isVibe: true, name: "Rizzable" },
  { id: 49, url: "https://owenchen07.github.io/", isVibe: true, name: "Owen Chen" },
  { id: 50, url: "https://www.williamcielen.com/", isVibe: false, name: "William Cielen" },
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
        className: "bg-green-500/90 border border-green-400 text-white backdrop-blur-sm",
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
          className: "bg-red-500/90 border border-red-400 text-white backdrop-blur-sm",
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
          className: "bg-red-500/90 border border-red-400 text-white backdrop-blur-sm",
        });
      }
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  if (gameState.gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#313032' }}>
        <Card className="p-10 text-center max-w-lg mx-auto bg-white/10 border border-white/20 backdrop-blur-sm">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-3 font-serif tracking-tight">
              Game Over!
            </h1>
            <p className="text-white/70 text-lg">You've used all your lives</p>
          </div>
          
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xl font-semibold text-white mb-2">Final Score</p>
            <p className="text-6xl font-bold text-white font-serif">
              {gameState.score}
            </p>
          </div>

          <Button 
            onClick={startNewGame}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg font-serif"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState.allSitesCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#313032' }}>
        <Card className="p-10 text-center max-w-lg mx-auto bg-white/10 border border-white/20 backdrop-blur-sm">
          <div className="mb-8">
            <Trophy className="h-20 w-20 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-white mb-3 font-serif tracking-tight">
              Congratulations!
            </h1>
            <p className="text-white/70 text-lg">You've rated all {websiteData.length} websites!</p>
          </div>
          
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xl font-semibold text-white mb-2">Final Score</p>
            <p className="text-6xl font-bold text-white font-serif">
              {gameState.score}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={startNewGame}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-4 text-lg border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg font-serif"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>

            <Button 
              onClick={onBackToMenu}
              variant="outline"
              size="lg"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              Back to Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#313032' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-bold text-white font-serif tracking-tight">
              Vibe or Not
            </h1>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-3 py-1">
                Score: {gameState.score}
              </Badge>
              {gameState.streak > 1 && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-3 py-1 animate-pulse">
                  <Zap className="mr-1 h-3 w-3" />
                  {gameState.streak}x Streak
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm mr-2">Lives:</span>
            {Array.from({ length: gameState.lives }).map((_, i) => (
              <Heart key={i} className="h-6 w-6 text-red-400 fill-current" />
            ))}
            {Array.from({ length: 3 - gameState.lives }).map((_, i) => (
              <Heart key={`empty-${i}`} className="h-6 w-6 text-white/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="px-6 py-8 max-w-6xl mx-auto">
        {gameState.currentSite && (
          <div className="space-y-8">
            {/* Website Preview */}
            <Card className="overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                <p className="text-sm text-white/70 mb-2">Determine if this site is vibe coded or not:</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-white font-serif">{gameState.currentSite.name}</h2>
                  <Button
                    onClick={() => window.open(gameState.currentSite.url, '_blank')}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="aspect-video bg-black/20">
                <iframe
                  src={gameState.currentSite.url}
                  className="w-full h-full"
                  title={`Preview of ${gameState.currentSite.name}`}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </Card>

            {/* Voting Buttons */}
            <div className="flex gap-6 justify-center">
              <Button
                onClick={() => handleVote(false)}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-12 py-6 text-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg font-serif"
              >
                Not Vibed
              </Button>
              
              <Button
                onClick={() => handleVote(true)}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-12 py-6 text-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg font-serif"
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
