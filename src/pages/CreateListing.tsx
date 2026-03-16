import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, X, ChevronDown, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { categories } from "@/data/mockItems";

const CreateListing = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [aiDetecting, setAiDetecting] = useState(false);

  const handlePhotoUpload = () => {
    // Mock AI detection
    setAiDetecting(true);
    const mockPhoto = "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop";
    setPhotos((prev) => [...prev, mockPhoto]);
    
    setTimeout(() => {
      setTitle("Perceuse visseuse sans fil");
      setCategory("Bricolage");
      setAiDetecting(false);
    }, 1500);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-5 py-4">
          <h1 className="text-xl font-bold text-foreground tracking-tight">Mettre en location</h1>
          <p className="text-xs text-muted-foreground">L'IA détecte automatiquement vos objets</p>
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-5 pt-4">
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: photos.length > 0 ? (title ? (price ? "100%" : "66%") : "33%") : "10%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="container mx-auto px-5 pt-6 space-y-6 max-w-[600px]">
        {/* Photo upload */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Photos</label>
          
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-card">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-foreground/70 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-background" />
                </button>
              </div>
            ))}

            {photos.length < 6 && (
              <button
                onClick={handlePhotoUpload}
                className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {aiDetecting ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-[10px] text-primary font-medium">Détection IA...</span>
                  </div>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px]">Ajouter</span>
                  </>
                )}
              </button>
            )}
          </div>

          {photos.length > 0 && title && !aiDetecting && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Objet détecté automatiquement : {title}
            </motion.div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Perceuse Bosch Professional"
            className="w-full h-12 px-4 rounded-xl bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Catégorie</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-xl bg-card shadow-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow appearance-none"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.filter(c => c.label !== "Tout").map((cat) => (
                <option key={cat.label} value={cat.label}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez l'état et les caractéristiques de l'objet..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow resize-none"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Prix par jour</label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full h-12 px-4 pr-12 rounded-xl bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow tabular-nums"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">€/jour</span>
          </div>

          {Number(price) > 0 && (
            <p className="text-xs text-muted-foreground">
              Assurance incluse : {(Number(price) * 0.15).toFixed(2)}€/jour
            </p>
          )}
        </div>

        {/* Submit */}
        <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2">
          <Upload className="w-4 h-4" />
          Publier l'annonce
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default CreateListing;
