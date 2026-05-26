import { useState } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { ProfessionalCard } from "../components/ProfessionalCard";
import { professionals } from "../data/mockData";

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const allSkills = Array.from(
    new Set(professionals.flatMap((p) => p.skills))
  ).sort();

  const allLocations = Array.from(
    new Set(professionals.map((p) => p.location))
  ).sort();

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || prof.location === selectedLocation;
    const matchesSkill = !selectedSkill || prof.skills.includes(selectedSkill);
    const matchesAvailability = !availableOnly || prof.available;

    return matchesSearch && matchesLocation && matchesSkill && matchesAvailability;
  });

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Professionals</h1>
          <p className="text-muted-foreground">
            Showing {filteredProfessionals.length} professionals
          </p>
        </div>

        <div className="flex gap-6">
          <aside className="w-80 space-y-6 shrink-0">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by name or title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-input rounded-lg border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">All Locations</option>
                      {allLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Skills</label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">All Skills</option>
                    {allSkills.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={availableOnly}
                        onChange={(e) => setAvailableOnly(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-secondary transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </div>
                    <span className="text-sm group-hover:text-foreground transition-colors">
                      Available for hire only
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("");
                    setSelectedSkill("");
                    setAvailableOnly(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-card transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No professionals found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
