import { useState } from "react";
import { useParams } from "react-router";
import { MapPin, Globe, Linkedin, Github, Mail, CheckCircle, Star, ExternalLink } from "lucide-react";
import { professionals } from "../data/mockData";
import { Button } from "../components/Button";

export function ProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"portfolio" | "about" | "reviews">("portfolio");

  const professional = professionals.find((p) => p.id === id);

  if (!professional) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Professional Not Found</h1>
          <p className="text-muted-foreground">The professional you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative">
        <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-background shadow-xl">
                <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
              </div>
              {professional.available && (
                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium shadow-lg">
                  Available
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold">{professional.name}</h1>
                  {professional.verified && (
                    <CheckCircle className="w-6 h-6 text-primary fill-primary" />
                  )}
                </div>
                <p className="text-xl text-muted-foreground">{professional.title}</p>
                <div className="flex items-center gap-1 text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{professional.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="p-2 rounded-lg border border-border hover:bg-card hover:border-primary/50 transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg border border-border hover:bg-card hover:border-primary/50 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg border border-border hover:bg-card hover:border-primary/50 transition-colors">
                  <Github className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="gap-2">
                  <Mail className="w-5 h-5" />
                  Contact
                </Button>
                <Button variant="outline">Save Profile</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-b border-border mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === "portfolio"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Portfolio
                {activeTab === "portfolio" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === "about"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                About
                {activeTab === "about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === "reviews"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Reviews
                {activeTab === "reviews" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            </div>
          </div>

          {activeTab === "portfolio" && (
            <div>
              {professional.portfolio && professional.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professional.portfolio.map((project) => (
                    <div
                      key={project.id}
                      className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No portfolio items yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="max-w-3xl">
              <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Bio</h3>
                  <p className="text-muted-foreground leading-relaxed">{professional.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {professional.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl space-y-6">
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="font-semibold">5.0</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Great to work with! Delivered the project on time and exceeded expectations."
                </p>
                <p className="text-sm text-muted-foreground">- John Doe, CEO at TechCorp</p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="font-semibold">5.0</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Highly professional and skilled. Would definitely work with again."
                </p>
                <p className="text-sm text-muted-foreground">- Sarah Johnson, Product Manager</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
