import { Star, MapPin, Leaf, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface ItemCardProps {
  title: string;
  price: number;
  image: string;
  distance: string;
  rating: number;
  reviews: number;
  co2Saved: string;
  isPro?: boolean;
  category: string;
}

const ItemCard = ({
  title,
  price,
  image,
  distance,
  rating,
  reviews,
  co2Saved,
  isPro,
  category,
}: ItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="group shadow-card hover:shadow-card-hover rounded-2xl bg-card overflow-hidden transition-shadow duration-200 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden p-1">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
        {isPro && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/90 text-accent-foreground text-xs font-medium backdrop-blur-sm">
            <Shield className="w-3 h-3" />
            Pro
          </span>
        )}
        <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-card/80 text-xs font-medium backdrop-blur-sm text-foreground">
          {category}
        </span>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3.5 h-3.5 fill-foreground text-foreground" />
            <span className="text-xs font-medium tabular-nums">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-base font-semibold tabular-nums text-foreground">
            {price}€<span className="text-xs font-normal text-muted-foreground">/jour</span>
          </p>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {distance}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-primary font-medium">
          <Leaf className="w-3 h-3" />
          <span>Économie de {co2Saved} CO₂</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
