import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GameGrid from "@/components/GameGrid";
import Leaderboard from "@/components/Leaderboard";
import FriendsSidebar from "@/components/FriendsSidebar";
import ChatWindow from "@/components/ChatWindow";
import AuthModal from "@/components/AuthModal";
import WalletModal from "@/components/WalletModal";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "playing";
  game?: string;
}

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [chatFriend, setChatFriend] = useState<Friend | null>(null);

  const handleOpenChat = (friend: Friend) => {
    setChatFriend(friend);
    setIsFriendsOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar 
        onAuthClick={() => setIsAuthOpen(true)} 
        onWalletClick={() => setIsWalletOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <GameGrid />
        <Leaderboard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Friends Button */}
      <button
        onClick={() => setIsFriendsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-gaming text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)] hover:scale-110 transition-all z-30"
      >
        <Users className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-green text-xs font-bold flex items-center justify-center text-background">
          3
        </span>
      </button>

      {/* Sidebars & Modals */}
      <FriendsSidebar 
        isOpen={isFriendsOpen} 
        onClose={() => setIsFriendsOpen(false)}
        onOpenChat={handleOpenChat}
      />
      <ChatWindow 
        friend={chatFriend} 
        onClose={() => setChatFriend(null)} 
      />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
      <WalletModal 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)} 
      />
    </div>
  );
};

export default Index;
