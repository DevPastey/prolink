import { Search, Code, Palette, Camera, Sprout, Music, TrendingUp } from "lucide-react";
import { ProfessionalCard } from "../components/ProfessionalCard";
import { CategoryCard } from "../components/CategoryCard";
import { Button } from "../components/Button";
import { professionals } from "../data/mockData";

export function HomePage() {
  const categories = [
    { icon: Code, title: "Developers", count: 1247 },
    { icon: Palette, title: "Designers", count: 856 },
    { icon: Camera, title: "Photographers", count: 432 },
    { icon: Sprout, title: "Agronomists", count: 218 },
    { icon: Music, title: "Creatives", count: 645 },
    { icon: TrendingUp, title: "Marketers", count: 523 },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Discover Top Professionals in Nigeria
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore portfolios, connect, and hire the best talent across various industries
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-xl">
                <Search className="w-6 h-6 text-muted-foreground ml-2" />
                <input
                  type="text"
                  placeholder="Search for Frontend Developer, Photographer, Designer..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="primary" className="px-8 py-4 text-lg">
              Explore Talent
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Featured Professionals</h2>
              <p className="text-muted-foreground">Discover talented professionals ready to work with you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {professionals.slice(0, 6).map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline">View All Professionals</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Find professionals in your industry</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                icon={category.icon}
                title={category.title}
                count={category.count}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Create Your Professional Profile Today</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of professionals showcasing their talent and connecting with opportunities
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" className="px-8 py-4 text-lg">
              Get Started
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
