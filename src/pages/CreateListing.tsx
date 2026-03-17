import { useState, useRef } from "react";
import { Camera, X, Sparkles, ChevronRight, ChevronLeft, Shield, AlertCircle, Leaf } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { categories } from "@/data/mockItems";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const STEPS = ["Photos", "Details", "Prix"];

const CreateListing = () => {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newValue, setNewValue] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [aiDetecting, setAiDetecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 pb-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Leaf className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Connexion requise</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          Connecte-toi pour mettre un objet en location.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
        >
          Se connecter
        </button>
        <BottomNav />
      </div>
    );
  }

  const kycLevel = Number(newValue) >= 500 ? "identity" : Number(newValue) > 0 ? "phone" : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remaining = 6 - photos.length;
    const toProcess = files.slice(0, remaining);

    setAiDetecting(true);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setPhotos((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });

    setTimeout(() => {
      setAiDetecting(false);
      toast({
        title: "Photo ajoutee !",
        description: "Remplissez les details de votre objet.",
        duration: 2000,
      });
    }, 800);

    // Reset input pour permettre re-selection du meme fichier
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const canNext = () => {
    if (step === 0) return photos.length > 0;
    if (step === 1) return title.trim() !== "" && category !== "" && condition !== "";
    return price !== "" && newValue !== "";
  };

  const handlePublish = () => {
    toast({
      title: "Annonce publiee !",
      description: "Votre objet est maintenant visible sur Explorer.",
      duration: 3000,
    });
    navigate("/explorer");
  };

  return (
    <div className="min-h-screen bg-background pb-32">

      {/* Input file cache */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="px-4 pt-10 pb-3">
        <h1 className="text-xl font-bold text-foreground">Mettre en location</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Ajoutez vos photos pour commencer</p>
      </div>

      {/* Stepper */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                i < step ? "bg-primary text-white" : i === step ? "bg-primary text-white ring-4 ring-primary/20" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium truncate ${i === step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-400" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="px-4 space-y-4">

        {/* STEP 0 — Photos */}
        {step === 0 && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Photos <span className="text-muted-foreground font-normal text-xs">({photos.length}/6)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {photos.map((photo, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-card">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
              {photos.length < 6 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  {aiDetecting ? (
                    <Sparkles size={16} className="text-primary animate-pulse" />
                  ) : (
                    <Camera size={16} className="text-muted-foreground" />
                  )}
                  <span className="text-[9px] text-muted-foreground">{aiDetecting ? "Chargement..." : "Ajouter"}</span>
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Selectionnez jusqu'a 6 photos depuis votre appareil.</p>
          </div>
        )}

        {/* STEP 1 — Details */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Titre</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Perceuse Bosch Professional" className="w-full h-11 px-4 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Categorie</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-11 px-4 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                <option value="">Selectionner une categorie</option>
                {categories.filter((c) => c.label !== "Tout").map((cat) => (
                  <option key={cat.label} value={cat.label}>{cat.icon} {cat.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Etat</label>
              <div className="grid grid-cols-3 gap-2">
                {["Neuf", "Tres bon", "Bon"].map((c) => (
                  <button key={c} onClick={() => setCondition(c)} className={`py-2 rounded-xl text-xs font-medium transition-all border ${condition === c ? "bg-primary text-white border-primary" : "bg-card border-border text-muted-foreground hover:border-primary"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Decrivez l'etat et les caracteristiques..." rows={2} className="w-full px-4 py-3 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
          </div>
        )}

        {/* STEP 2 — Prix */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Prix par jour</label>
              <div className="relative">
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="w-full h-11 px-4 pr-14 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 tabular-nums" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€/jour</span>
              </div>
              {Number(price) > 0 && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-3 py-2">
                  <Leaf size={12} />
                  <span className="text-xs font-medium">Assurance incluse : {(Number(price) * 0.15).toFixed(2)}€/jour</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">Valeur a neuf estimee</label>
              <div className="relative">
                <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="0" className="w-full h-11 px-4 pr-10 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 tabular-nums" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
              </div>
              {kycLevel === "phone" && (
                <div className="flex items-center gap-2 bg-blue-50 text-blue-600 rounded-xl px-3 py-2">
                  <Shield size={12} />
                  <span className="text-xs font-medium">Verification par telephone requise</span>
                </div>
              )}
              {kycLevel === "identity" && (
                <div className="flex items-center gap-2 bg-orange-50 text-orange-600 rounded-xl px-3 py-2">
                  <AlertCircle size={12} />
                  <span className="text-xs font-medium">Verification identite requise (valeur superieure a 500€)</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-24 left-0 right-0 px-4 flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-secondary text-foreground text-sm font-semibold">
            <ChevronLeft size={16} /> Retour
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-40 transition-opacity">
            Suivant <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handlePublish} disabled={!canNext()} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-40 transition-opacity">
            <Sparkles size={15} /> Publier l'annonce
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CreateListing;
