interface CategoryPillProps {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryPill = ({ label, icon, active, onClick }: CategoryPillProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 min-h-[44px] ${
      active
        ? "bg-foreground text-background shadow-card"
        : "bg-card text-muted-foreground shadow-card hover:text-foreground"
    }`}
  >
    <span className="text-base">{icon}</span>
    {label}
  </button>
);

export default CategoryPill;
