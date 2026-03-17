import { useState } from "react";
import { Star, Leaf, Euro, ChevronRight, Shield, Phone, CreditCard, Package, CalendarDays, History, Building2, Eye, EyeOff, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const profileData = {
  name: "Lucas Dupont",
  initials: "LD",
  email: "lucas.dupont@email.com",
  memberSince: "Mars 2025",
  rating: 4.8,
  reviews: 15,
  co2Saved: 23.4,
  moneySaved: 342,
  credits: 45,
  kycLevel: "phone" as const,
  isPro: false,
};

const myListings = [
  { id: "1", title: "Perceuse visseuse Bosch", price: 8, status: "active", views: 42 },
  { id: "2", title: "Tondeuse Husqvarna", price: 15, status: "active", views: 18 },
  { id: "3", title: "Drone DJI Mini 3", price: 30, status: "paused", views: 67 },
];

const myRentals = [
  { id: "r1", title: "Velo electrique Cowboy", date: "12-14 Mars", status: "en cours", price: 75 },
  { id: "r2", title: "Appareil photo Canon", date: "5 Mars", status: "terminee", price: 35 },
  { id: "r3", title: "Enceinte JBL PartyBox", date: "28 Fev", status: "terminee", price: 40 },
];

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"listings" | "rentals">("listings");
  const { toast } = useToast();
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      toast({ title: "Champs manquants", description: "Veuillez remplir tous les champs.", duration: 2500 });
      return;
    }
    if (email === "admin" && password === "admin") {
      login();
      toast({ title: "Bienvenue Lucas !", description: "Connexion reussie.", duration: 2000 });
      return;
    }
    toast({
      title: isLogin ? "Connexion bientot disponible" : "Inscription bientot disponible",
      description: "L'authentification arrive tres prochainement.",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    logout();
    setEmail("");
    setPassword("");
    toast({ title: "Deconnecte", duration: 1500 });
    navigate("/explorer");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 pb-24">
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Loukit</h1>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            {isLogin ? "Content de te revoir !" : "Rejoins la communaute Loukit"}
          </p>
        </div>

        <div className="flex w-full max-w-sm bg-secondary rounded-2xl p-1 mb-6">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isLogin ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}>
            Se connecter
          </button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${!isLogin ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}>
            S'inscrire
          </button>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@email.com" className="w-full h-12 px-4 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Mot de passe</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 px-4 pr-12 rounded-xl bg-card shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button onClick={handleSubmit} className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors mt-2">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou continuer avec</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toast({ title: "Google bientot disponible", duration: 2000 })} className="flex items-center justify-center gap-2 h-11 bg-card shadow-card rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors border border-border">
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button onClick={() => toast({ title: "Apple bientot disponible", duration: 2000 })} className="flex items-center justify-center gap-2 h-11 bg-foreground shadow-card rounded-xl text-sm font-medium text-background hover:opacity-90 transition-opacity">
              <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.7 0 248.4 0 126.4c0-70.5 24-135.1 67.9-181.3C116.8 99.9 167.7 124.4 221.7 124.4c72.7 0 118.3-39.5 167.1-39.5 46.8 0 101.8 41.9 162.3 41.9 59.7 0 123.1-25.9 164.6-75.3z"/></svg>
              Apple
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Mon Profil</h1>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <LogOut size={14} /> Deconnexion
          </button>
        </div>
        <div className="flex items-center gap-4 bg-card rounded-2xl p-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center text-xl font-bold shrink-0">
            {profileData.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-foreground">{profileData.name}</h2>
            <p className="text-xs text-muted-foreground">{profileData.email}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Membre depuis {profileData.memberSince}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(profileData.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{profileData.rating} ({profileData.reviews} avis)</span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 rounded-2xl p-3 text-center">
            <Leaf size={18} className="text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-700">{profileData.co2Saved}kg</p>
            <p className="text-[10px] text-green-600">CO2 economise</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3 text-center">
            <Euro size={18} className="text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-blue-700">{profileData.moneySaved}€</p>
            <p className="text-[10px] text-blue-600">Economise</p>
          </div>
          <div className="bg-primary/10 rounded-2xl p-3 text-center">
            <CreditCard size={18} className="text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-primary">{profileData.credits}€</p>
            <p className="text-[10px] text-primary">Credits</p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4 space-y-2">
        <div className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Phone size={16} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Verification</p>
            <p className="text-xs text-muted-foreground">Telephone verifie</p>
          </div>
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verifie</span>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card">
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Shield size={16} className="text-orange-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Verification identite</p>
            <p className="text-xs text-muted-foreground">Requise pour objets valeur superieure a 500€</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <Building2 size={16} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Compte Pro</p>
            <p className="text-xs text-muted-foreground">Ajoutez votre numero SIRET</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="flex gap-2 mb-3">
          <button onClick={() => setActiveTab("listings")} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "listings" ? "bg-primary text-white" : "bg-card text-muted-foreground shadow-card"}`}>
            <Package size={14} /> Mes annonces
          </button>
          <button onClick={() => setActiveTab("rentals")} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "rentals" ? "bg-primary text-white" : "bg-card text-muted-foreground shadow-card"}`}>
            <CalendarDays size={14} /> Mes locations
          </button>
        </div>
        {activeTab === "listings" && (
          <div className="space-y-2">
            {myListings.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Package size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.price}€/jour · {item.views} vues</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-600"}`}>
                  {item.status === "active" ? "Actif" : "Pause"}
                </span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "rentals" && (
          <div className="space-y-2">
            {myRentals.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <CalendarDays size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date} · {item.price}€</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === "en cours" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <History size={16} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Historique des transactions</p>
            <p className="text-xs text-muted-foreground">3 transactions ce mois</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
