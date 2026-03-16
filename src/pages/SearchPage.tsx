import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, MapPin, X } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import BottomNav from "@/components/BottomNav";
import { mockItems } from "@/data/mockItems";

const distances = ["< 1 km", "< 5 km", "< 10 km", "< 25 km", "Toute distance"];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("< 10 km");

  const filtered = mockItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-5 pt-4 pb-3 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un objet..."
              className="w-full h-12 pl-10 pr-10 rounded-xl bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Distance filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-hide">
            {distances.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistance(d)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 min-h-[36px] ${
                  selectedDistance === d
                    ? "bg-foreground text-background shadow-card"
                    : "bg-card text-muted-foreground shadow-card hover:text-foreground"
                }`}
              >
                <MapPin className="w-3 h-3" />
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 pt-4">
        {query && (
          <p className="text-xs text-muted-foreground mb-3">
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""} pour "{query}"
          </p>
        )}
        <motion.div layout className="grid grid-cols-2 gap-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </motion.div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Aucun résultat trouvé.</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default SearchPage;
