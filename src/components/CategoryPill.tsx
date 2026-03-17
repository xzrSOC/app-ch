import { motion } from "framer-motion";

interface CategoryPillProps {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryPill = ({ label, icon, active, onClick }: CategoryPillProps) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap select-none
      ${active
        ? "bg-primary text-white shadow-md"
        : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </motion.button>
);

export default CategoryPill;
