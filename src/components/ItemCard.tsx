import { Star, MapPin, Leaf, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const ItemCard = ({ title, price, image, distance, rating, reviews, co2Saved, isPro, category }: ItemCardProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Connexion requise",
      description: "Connecte-toi pour voir cette annonce.",
      duration: 2500,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      {/* Image fixe 160px max, bien cadree */}
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        {isPro && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
            <Shield size={10} /> Pro
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-1.5">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            {price}<span className="text-xs font-normal text-muted-foreground">/jour</span>
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={11} />
            <span className="text-xs">{distance}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-600 bg-green-50 rounded-lg px-2 py-1">
          <Leaf size={11} />
          <span className="text-[10px] font-medium">Economie de {co2Saved} CO2</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
