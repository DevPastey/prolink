import { useState } from "react";
import { User, Briefcase, Settings, Upload, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/Button";

export function DashboardPage() {
  const [activeSection, setActiveSection] = useState<"profile" | "portfolio" | "settings">("profile");

  const [formData, setFormData] = useState({
    name: "Chioma Adeyemi",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience",
    location: "Lagos, Nigeria",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  });

  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your professional profile</p>
        </div>

        <div className="flex gap-6">
          <aside className="w-64 space-y-2 shrink-0">
            <div className="bg-card rounded-2xl border border-border p-4 sticky top-24">
              <button
                onClick={() => setActiveSection("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === "profile"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveSection("portfolio")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === "portfolio"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Portfolio</span>
              </button>

              <button
                onClick={() => setActiveSection("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === "settings"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </aside>

          <div className="flex-1">
            {activeSection === "profile" && (
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-bold text-primary-foreground">
                      CA
                    </div>
                    <div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG or GIF. Max size 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Professional Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block mb-2 text-sm">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="https://"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="https://"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">GitHub</label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="https://"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Skills</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        className="flex-1 px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="Add a skill..."
                      />
                      <Button onClick={addSkill} variant="primary">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center gap-2"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button variant="primary">Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "portfolio" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Portfolio</h2>
                  <Button variant="primary" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Add Project
                  </Button>
                </div>

                <div className="bg-card rounded-2xl border border-border p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm">Project Image</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Project Title</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="E-commerce Platform"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Description</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Describe your project..."
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Project Link</label>
                      <input
                        type="url"
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="https://"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Technologies Used</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary transition-colors"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>

                    <div className="flex gap-3 pt-6">
                      <Button variant="primary">Add Project</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-semibold mb-6">Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div>
                      <h3 className="font-medium">Available for Hire</h3>
                      <p className="text-sm text-muted-foreground">
                        Let others know you're open to new opportunities
                      </p>
                    </div>
                    <label className="relative inline-block">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-secondary transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about profile views and messages
                      </p>
                    </div>
                    <label className="relative inline-block">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-secondary transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible in search results
                      </p>
                    </div>
                    <label className="relative inline-block">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-secondary transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </div>

                  <div className="pt-6">
                    <Button variant="primary">Save Settings</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
