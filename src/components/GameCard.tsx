import { Lock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  image: string;
  category: string;
  rating: number;
  players: number;
  price?: number;
  isLocked?: boolean;
  isFeatured?: boolean;
}

const GameCard = ({ 
  title, 
  image, 
  category, 
  rating, 
  players, 
  price, 
  isLocked = false,
  isFeatured = false 
}: GameCardProps) => {
  return (
    <div className={`game-card group cursor-pointer ${isFeatured ? 'col-span-2 row-span-2' : ''}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Lock Icon */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-muted/80 flex items-center justify-center">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {price ? `${price.toLocaleString()}đ` : 'Mở khóa'}
              </span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
            {category}
          </span>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">
              Nổi bật
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-neon-orange fill-neon-orange" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{players >= 1000 ? `${(players/1000).toFixed(1)}k` : players}</span>
            </div>
          </div>
          
          {isLocked ? (
            <Button variant="neon" size="sm">
              Mở khóa
            </Button>
          ) : (
            <Button variant="gaming" size="sm">
              Chơi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
