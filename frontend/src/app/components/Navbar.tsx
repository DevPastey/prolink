import { Link } from "react-router";
import { Search } from "lucide-react";
import { ThemeToggle } from "../components/Themetoggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">TalentHub</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/explore" className="text-foreground/80 hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link to="/explore" className="text-foreground/80 hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/login" className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20">
              Sign Up
            </Link>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
