import { motion } from "framer-motion";
import {
  Star, Leaf, Euro, Settings, ChevronRight, Shield, Phone,
  CreditCard, Package, CalendarDays, History, Building2,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const profile = {
  name: "Lucas Dupont",
  initials: "LD",
  email: "lucas.dupont@email.com",
  memberSince: "Mars 2025",
  rating: 4.8,
  reviews: 15,
  co2Saved: 23.4,
  moneySaved: 342,
  credits: 45,
  kycLevel: "phone" as const, // "phone" | "id"
  isPro: false,
};

const myListings = [
  { id: "1", title: "Perceuse visseuse Bosch", price: 8, status: "active", views: 42 },
  { id: "2", title: "Tondeuse Husqvarna", price: 15, status: "active", views: 18 },
  { id: "3", title: "Drone DJI Mini 3", price: 30, status: "paused", views: 67 },
];

const myRentals = [
  { id: "r1", title: "Vélo électrique Cowboy", date: "12-14 Mars", status: "en cours", price: 75 },
  { id: "r2", title: "Appareil photo Canon", date: "5 Mars", status: "terminée", price: 35 },
  { id: "r3", title: "Enceinte JBL PartyBox", date: "28 Fév", status: "terminée", price: 40 },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-foreground text-background px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="container mx-auto flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold tracking-tight">Profil</h1>
          <button className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="container mx-auto flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-background/15 flex items-center justify-center text-xl font-bold">
            {profile.initials}
          </div>
          <div>
            <h2 className="text-lg font-bold">{profile.name}</h2>
            <p className="text-sm text-background/60">Membre depuis {profile.memberSince}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm font-medium tabular-nums">{profile.rating}</span>
              <span className="text-xs text-background/50">({profile.reviews} avis)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 -mt-4 space-y-4">
        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="shadow-card rounded-2xl bg-card p-4 text-center">
            <Leaf className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold tabular-nums text-foreground">{profile.co2Saved}kg</p>
            <p className="text-[10px] text-muted-foreground">CO₂ économisé</p>
          </div>
          <div className="shadow-card rounded-2xl bg-card p-4 text-center">
            <Euro className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold tabular-nums text-foreground">{profile.moneySaved}€</p>
            <p className="text-[10px] text-muted-foreground">Économisé</p>
          </div>
          <div className="shadow-card rounded-2xl bg-card p-4 text-center">
            <CreditCard className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-lg font-bold tabular-nums text-foreground">{profile.credits}€</p>
            <p className="text-[10px] text-muted-foreground">Crédits</p>
          </div>
        </motion.div>

        {/* KYC */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="shadow-card rounded-2xl bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Vérification</p>
                <p className="text-xs text-muted-foreground">
                  {profile.kycLevel === "phone" ? "Téléphone vérifié" : "Identité vérifiée"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
              <Phone className="w-3 h-3" />
              Niveau 1
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Vérifiez votre identité pour louer des objets de plus de 500€.
          </p>
          <button className="w-full mt-3 py-2.5 rounded-xl bg-accent/10 text-accent text-sm font-medium min-h-[44px] hover:bg-accent/20 transition-colors">
            Passer au Niveau 2 (Carte d'identité)
          </button>
        </motion.div>

        {/* Pro section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="shadow-card rounded-2xl bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Compte Pro</p>
                <p className="text-xs text-muted-foreground">Louez en tant que professionnel</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Ajoutez votre numéro SIRET pour bénéficier du statut professionnel et d'une visibilité accrue.
          </p>
        </motion.div>

        {/* My listings */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 px-1">
            <Package className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Mes annonces</h3>
          </div>
          <div className="space-y-2">
            {myListings.map((listing) => (
              <div key={listing.id} className="shadow-card rounded-2xl bg-card p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{listing.title}</p>
                  <p className="text-xs text-muted-foreground">{listing.price}€/jour · {listing.views} vues</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${
                  listing.status === "active"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {listing.status === "active" ? "Actif" : "En pause"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* My rentals */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 px-1">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Mes locations</h3>
          </div>
          <div className="space-y-2">
            {myRentals.map((rental) => (
              <div key={rental.id} className="shadow-card rounded-2xl bg-card p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{rental.title}</p>
                  <p className="text-xs text-muted-foreground">{rental.date} · {rental.price}€</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${
                  rental.status === "en cours"
                    ? "bg-accent/10 text-accent"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {rental.status === "en cours" ? "En cours" : "Terminée"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transaction history */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="shadow-card rounded-2xl bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                <History className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Historique</p>
                <p className="text-xs text-muted-foreground">3 transactions ce mois</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
