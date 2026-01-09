import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "ProGamer_VN", avatar: "https://i.pravatar.cc/100?img=1", score: 125800, change: "up" },
  { rank: 2, name: "NightWolf99", avatar: "https://i.pravatar.cc/100?img=2", score: 118500, change: "up" },
  { rank: 3, name: "DragonSlayer", avatar: "https://i.pravatar.cc/100?img=3", score: 112300, change: "down" },
  { rank: 4, name: "CyberNinja", avatar: "https://i.pravatar.cc/100?img=4", score: 98700, change: "same" },
  { rank: 5, name: "PixelMaster", avatar: "https://i.pravatar.cc/100?img=5", score: 95200, change: "up" },
  { rank: 6, name: "StormRider", avatar: "https://i.pravatar.cc/100?img=6", score: 89400, change: "down" },
  { rank: 7, name: "GhostPlayer", avatar: "https://i.pravatar.cc/100?img=7", score: 85100, change: "same" },
  { rank: 8, name: "LegendKing", avatar: "https://i.pravatar.cc/100?img=8", score: 82800, change: "up" },
];

const Leaderboard = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-neon-orange" />
            <h2 className="font-display text-4xl font-bold text-foreground">
              Bảng Xếp Hạng
            </h2>
          </div>
          <p className="text-muted-foreground">Top game thủ xuất sắc nhất tuần</p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={leaderboardData[1].avatar} 
                alt={leaderboardData[1].name}
                className="w-20 h-20 rounded-full border-4 border-gray-400 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <Medal className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="glass-card px-6 py-4 text-center rounded-t-xl">
              <p className="font-display font-semibold text-foreground">{leaderboardData[1].name}</p>
              <p className="text-sm text-muted-foreground">{leaderboardData[1].score.toLocaleString()} pts</p>
            </div>
            <div className="w-full h-24 bg-gradient-to-t from-gray-600 to-gray-400 rounded-b-xl flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-white">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-8">
            <div className="relative mb-4">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Crown className="w-10 h-10 text-neon-orange animate-glow-pulse" />
              </div>
              <img 
                src={leaderboardData[0].avatar} 
                alt={leaderboardData[0].name}
                className="w-24 h-24 rounded-full border-4 border-neon-orange object-cover shadow-[0_0_30px_hsl(var(--neon-orange)/0.5)]"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-neon-orange flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="glass-card px-8 py-4 text-center rounded-t-xl neon-border">
              <p className="font-display font-bold text-lg text-primary">{leaderboardData[0].name}</p>
              <p className="text-sm text-muted-foreground">{leaderboardData[0].score.toLocaleString()} pts</p>
            </div>
            <div className="w-full h-32 bg-gradient-to-t from-neon-orange to-yellow-400 rounded-b-xl flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-white">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={leaderboardData[2].avatar} 
                alt={leaderboardData[2].name}
                className="w-20 h-20 rounded-full border-4 border-amber-700 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center">
                <Medal className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="glass-card px-6 py-4 text-center rounded-t-xl">
              <p className="font-display font-semibold text-foreground">{leaderboardData[2].name}</p>
              <p className="text-sm text-muted-foreground">{leaderboardData[2].score.toLocaleString()} pts</p>
            </div>
            <div className="w-full h-20 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-xl flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-white">3</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
              <div className="col-span-2">Hạng</div>
              <div className="col-span-6">Người chơi</div>
              <div className="col-span-3 text-right">Điểm</div>
              <div className="col-span-1 text-center">+/-</div>
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {leaderboardData.slice(3).map((player) => (
              <div 
                key={player.rank}
                className="grid grid-cols-12 items-center p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="col-span-2">
                  <span className="font-display font-bold text-lg text-muted-foreground">
                    #{player.rank}
                  </span>
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  <img 
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-border"
                  />
                  <span className="font-medium text-foreground">{player.name}</span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="font-display font-semibold text-primary">
                    {player.score.toLocaleString()}
                  </span>
                </div>
                <div className="col-span-1 flex justify-center">
                  {player.change === "up" && <TrendingUp className="w-4 h-4 text-neon-green" />}
                  {player.change === "down" && <TrendingDown className="w-4 h-4 text-destructive" />}
                  {player.change === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
