import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Zap, Heart, Plus } from "lucide-react";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 max-w-2xl mx-auto border border-border shadow-card" style={{ backgroundColor: '#313032' }}>
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <video 
              autoPlay 
              muted 
              className="h-24 w-auto"
              style={{ maxWidth: '100%' }}
            >
              <source src="/title.mp4" type="video/mp4" />
              <h1 className="text-6xl font-bold text-foreground mb-4 font-serif">
                Vibe or Not
              </h1>
            </video>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Deduce which sites are vibe coded...
          </p>
          <p className="text-sm text-muted-foreground">
            Can you spot which sites have that special something?
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-muted border-l-2 border-primary">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm">Vote "Vibed" or "Not Vibed" for each website</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted border-l-2 border-primary">
            <Zap className="h-5 w-5 text-vibe" />
            <span className="text-sm">Build streaks for bonus points</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted border-l-2 border-primary">
            <Heart className="h-5 w-5 text-destructive" />
            <span className="text-sm">You have 3 lives - don't waste them!</span>
          </div>
        </div>

        <Button 
          onClick={onStartGame}
          size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg border transition-all duration-200 font-serif"
        >
          <Play className="mr-2 h-5 w-5" />
          Start Playing
        </Button>

        <div className="mt-4 flex justify-center">
          <Button 
            onClick={() => window.open('https://forms.gle/bKotMS8bL1C7EoKX9', '_blank')}
            variant="outline"
            size="sm"
            className="text-xs bg-transparent border-border hover:bg-muted transition-all duration-200"
          >
            <Plus className="mr-1 h-3 w-3" />
            Give Us Your Site :)
          </Button>
        </div>

        <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Ready to play</strong> All websites loaded and ready.
          </p>
        </div>
      </Card>
    </div>
  );
}
