import { Search, PlusCircle, MessageSquare, User, Compass } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  requiresAuth: boolean;
}

const navItems: NavItem[] = [
  { icon: Compass, label: "Explorer", path: "/explorer", requiresAuth: false },
  { icon: Search, label: "Recherche", path: "/search", requiresAuth: true },
  { icon: PlusCircle, label: "Louer", path: "/create", requiresAuth: true },
  { icon: MessageSquare, label: "Messages", path: "/messages", requiresAuth: true },
  { icon: User, label: "Profil", path: "/profile", requiresAuth: false },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();

  const handleNavClick = (item: NavItem) => {
    if (item.requiresAuth && !isLoggedIn) {
      toast({
        title: "Connexion requise",
        description: "Connecte-toi pour acceder a cette fonctionnalite.",
        duration: 2500,
      });
      navigate("/profile");
      return;
    }
    navigate(item.path);
  };

  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center justify-around gap-1 px-4 py-2 rounded-[28px] border border-white/20"
        style={{
          background: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isLocked = item.requiresAuth && !isLoggedIn;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[48px] rounded-2xl px-2 transition-all duration-200 ${
                isLocked
                  ? "opacity-30 cursor-not-allowed"
                  : isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-2xl" style={{ background: "rgba(0,0,0,0.06)" }} />
              )}
              <Icon size={20} />
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
