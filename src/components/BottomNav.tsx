import { Search, PlusCircle, MessageSquare, User, Compass } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  locked: boolean;
}

const navItems: NavItem[] = [
  { icon: Compass, label: "Explorer", path: "/explorer", locked: false },
  { icon: Search, label: "Recherche", path: "/search", locked: false },
  { icon: PlusCircle, label: "Louer", path: "/create", locked: false },
  { icon: MessageSquare, label: "Messages", path: "/messages", locked: false },
  { icon: User, label: "Profil", path: "/profile", locked: false },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (item: NavItem) => {
    if (item.locked) return;
    navigate(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-card/90 border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] rounded-xl transition-colors duration-200 ${
                item.locked
                  ? "opacity-30 cursor-not-allowed"
                  : isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              disabled={item.locked}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-3 right-3 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
