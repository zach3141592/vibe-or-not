import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Zap, Heart } from "lucide-react";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className="p-8 max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Vibe or Not
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Deduce which sites are vibe coded...
          </p>
          <p className="text-sm text-muted-foreground">
            Can you spot which sites have that special something?
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm">Vote "Vibed" or "Not Vibed" for each website</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <Zap className="h-5 w-5 text-vibe" />
            <span className="text-sm">Build streaks for bonus points</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <Heart className="h-5 w-5 text-destructive" />
            <span className="text-sm">You have 3 lives - don't waste them!</span>
          </div>
        </div>

        <Button 
          onClick={onStartGame}
          size="lg"
          className="w-full bg-gradient-vibe hover:bg-gradient-vibe/90 text-vibe-foreground font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Play className="mr-2 h-5 w-5" />
          Start Playing
        </Button>

        <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Ready to play!</strong> All websites loaded and ready for rating.
          </p>
        </div>
      </Card>
    </div>
  );
}
