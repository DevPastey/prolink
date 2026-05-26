import { Link } from "react-router";
import { MapPin, CheckCircle } from "lucide-react";

interface Professional {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  skills: string[];
  available?: boolean;
  verified?: boolean;
}

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Link to={`/profile/${professional.id}`}>
      <div className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary/50 transition-all">
              <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
            </div>
            {professional.available && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-card"></div>
            )}
          </div>

          <div className="space-y-1 w-full">
            <div className="flex items-center justify-center gap-1">
              <h3 className="font-semibold">{professional.name}</h3>
              {professional.verified && (
                <CheckCircle className="w-4 h-4 text-primary fill-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{professional.title}</p>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{professional.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {professional.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>

          <button className="w-full mt-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
            View Profile
          </button>
        </div>
      </div>
    </Link>
  );
}
