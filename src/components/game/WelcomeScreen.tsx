import { Button } from "@/components/ui/button";
import { Play, Github } from "lucide-react";

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
          Can you tell if these sites are vibe coded or not?
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col gap-4 items-center">
          <Button 
            onClick={onStartGame}
            size="lg"
            className="bg-white/95 text-black hover:bg-white font-medium px-12 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
          >
            <Play className="mr-3 h-6 w-6" />
            Start Playing
          </Button>
          
          <Button 
            onClick={() => window.open('https://github.com/Casper-Dong/vibe-or-not', '_blank')}
            size="lg"
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white/10 font-medium px-8 py-4 text-base transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <Github className="mr-2 h-5 w-5" />
            Star us on GitHub
          </Button>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <Button 
          onClick={() => window.open('https://forms.gle/f7UzJ4pZWDWsTswJ8', '_blank')}
          size="sm"
          variant="outline"
          className="bg-transparent border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm mb-4"
        >
          Add Your Website
        </Button>
        <p className="text-white/60 text-sm drop-shadow-md">
          Help your site get more traction and add it!
        </p>
      </div>
    </div>
  );
}
