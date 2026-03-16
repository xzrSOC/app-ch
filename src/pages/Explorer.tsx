import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import CategoryPill from "@/components/CategoryPill";
import BottomNav from "@/components/BottomNav";
import { categories, mockItems } from "@/data/mockItems";

const Explorer = () => {
  const [activeCategory, setActiveCategory] = useState("Tout");

  const filteredItems =
    activeCategory === "Tout"
      ? mockItems
      : mockItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Explorer</h1>
              <p className="text-xs text-muted-foreground">
                {mockItems.length} objets près de vous
              </p>
            </div>
            <button className="w-10 h-10 rounded-xl shadow-card bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-hide">
            {categories.map((cat) => (
              <CategoryPill
                key={cat.label}
                label={cat.label}
                icon={cat.icon}
                active={activeCategory === cat.label}
                onClick={() => setActiveCategory(cat.label)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-5 pt-4">
        <motion.div
          layout
          className="grid grid-cols-2 gap-3"
        >
          {filteredItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Aucun objet dans cette catégorie.</p>
          </div>
        )}

        {filteredItems.length > 0 && (
          <div className="flex justify-center mt-6">
            <button className="px-6 py-3 rounded-xl shadow-card bg-card text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px]">
              Charger plus
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Explorer;
