import GameCard from "./GameCard";
import { Gamepad2 } from "lucide-react";

const games = [
  {
    id: 1,
    title: "Cyber Racers 2077",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80",
    category: "Đua xe",
    rating: 4.8,
    players: 12500,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80",
    category: "Bắn súng",
    rating: 4.5,
    players: 8900,
  },
  {
    id: 3,
    title: "Puzzle Master",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&q=80",
    category: "Puzzle",
    rating: 4.7,
    players: 15200,
  },
  {
    id: 4,
    title: "Medieval Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
    category: "RPG",
    rating: 4.9,
    players: 22000,
    isLocked: true,
    price: 50000,
  },
  {
    id: 5,
    title: "Neon Fighter",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
    category: "Đối kháng",
    rating: 4.6,
    players: 7800,
  },
  {
    id: 6,
    title: "Galaxy Explorer",
    image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400&q=80",
    category: "Phiêu lưu",
    rating: 4.4,
    players: 9500,
    isLocked: true,
    price: 30000,
  },
  {
    id: 7,
    title: "Speed Legends",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&q=80",
    category: "Đua xe",
    rating: 4.3,
    players: 11200,
  },
  {
    id: 8,
    title: "Dungeon Crawler",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    category: "RPG",
    rating: 4.8,
    players: 18500,
  },
];

const GameGrid = () => {
  return (
    <section className="py-20 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Thư viện Game
              </h2>
              <p className="text-muted-foreground mt-1">
                Khám phá các tựa game hot nhất
              </p>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="hidden md:flex items-center gap-2">
            <FilterTab label="Tất cả" active />
            <FilterTab label="Miễn phí" />
            <FilterTab label="Mới nhất" />
            <FilterTab label="Phổ biến" />
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <GameCard 
              key={game.id} 
              {...game}
              isFeatured={index === 0}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-xl font-display font-semibold text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
            Xem thêm game
          </button>
        </div>
      </div>
    </section>
  );
};

const FilterTab = ({ label, active }: { label: string; active?: boolean }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
      active
        ? "bg-primary/20 text-primary border border-primary/30"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`}
  >
    {label}
  </button>
);

export default GameGrid;
