import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundColor: '#313032'
      }}
    >
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Main video/logo */}
        <div className="mb-12">
          <video 
            autoPlay 
            muted 
            className="h-64 w-auto mx-auto"
            style={{ maxWidth: '800px' }}
            onEnded={(e) => {
              e.currentTarget.pause();
            }}
          >
            <source src="/title.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Minimal subtitle */}
        <p className="text-white/90 text-lg mb-16 font-light tracking-wide drop-shadow-lg">
          Can you spot which sites have that special something?
        </p>
        
        {/* Start button */}
        <Button 
          onClick={onStartGame}
          size="lg"
          className="bg-white/95 text-black hover:bg-white font-medium px-12 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
        >
          <Play className="mr-3 h-6 w-6" />
          Start Playing
        </Button>
      </div>
      
      {/* Subtle bottom text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-white/60 text-sm drop-shadow-md">
          Deduce which sites are vibe coded
        </p>
      </div>
    </div>
  );
}
