import { motion } from "framer-motion";
import { ArrowRight, Leaf, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Zap,
    title: "IA intelligente",
    desc: "Détection automatique des objets et modération instantanée.",
  },
  {
    icon: Shield,
    title: "Transactions sécurisées",
    desc: "KYC adaptatif et paiements protégés pour chaque échange.",
  },
  {
    icon: Leaf,
    title: "Impact écologique",
    desc: "Suivez votre empreinte carbone et contribuez à l'économie circulaire.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-5 pt-16 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-primary-foreground tracking-tight">
                Loukit
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-[1.1] tracking-tight mb-4">
              Louez ce dont vous avez besoin, près de chez vous.
            </h1>

            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-md">
              La marketplace de location entre particuliers. Économisez de l'argent et réduisez votre impact environnemental.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/explorer")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Explorer les objets
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-foreground/15 text-primary-foreground font-medium text-base min-h-[48px] backdrop-blur-sm transition-all duration-200 hover:bg-primary-foreground/25 active:scale-[0.98]">
                Se connecter
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-5 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="shadow-elevated rounded-2xl bg-card p-6 grid grid-cols-3 gap-4"
        >
          {[
            { value: "12k+", label: "Objets disponibles" },
            { value: "8.2t", label: "CO₂ économisés" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold tabular-nums text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-5 py-16 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Comment ça marche
          </h2>
          <p className="text-muted-foreground mt-1">
            Simple, sécurisé, écologique.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-start gap-4 p-4 rounded-2xl shadow-card bg-card"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-5 pb-24">
        <div className="rounded-2xl bg-foreground p-8 text-center">
          <h2 className="text-2xl font-bold text-background tracking-tight mb-2">
            Prêt à commencer ?
          </h2>
          <p className="text-background/70 mb-6">
            Rejoignez la communauté et commencez à louer dès maintenant.
          </p>
          <button
            onClick={() => navigate("/explorer")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Commencer gratuitement
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
