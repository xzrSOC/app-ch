import { useState } from "react";
import { SlidersHorizontal, MapPin, Search } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import CategoryPill from "@/components/CategoryPill";
import BottomNav from "@/components/BottomNav";
import { categories, mockItems } from "@/data/mockItems";

const Explorer = () => {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");

  const filteredItems = mockItems
    .filter((item) => activeCategory === "Tout" || item.category === activeCategory)
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-background pb-24">

      {/* Header */}
      <div className="px-4 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Explorer</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin size={11} />
              <span>Autour de moi</span>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              showFilters ? "bg-primary text-white" : "bg-secondary text-foreground"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filtres
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un objet..."
            className="w-full h-11 pl-9 pr-4 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="px-4 pb-3">
          <div className="bg-card rounded-2xl p-4 shadow-card space-y-3">
            <p className="text-xs font-semibold text-foreground">Trier par</p>
            <div className="flex gap-2">
              {(["distance", "price", "rating"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    sortBy === s ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s === "distance" ? "Distance" : s === "price" ? "Prix" : "Note"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-none">
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

      {/* Results count */}
      <div className="px-4 mb-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredItems.length}</span>{" "}
          {filteredItems.length > 1 ? "objets" : "objet"} pres de vous
        </p>
      </div>

      {/* Grid */}
      <div className="px-4">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <ItemCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-medium text-foreground">Aucun objet trouve</p>
            <p className="text-sm mt-1">Essaie une autre categorie ou recherche</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Explorer;
