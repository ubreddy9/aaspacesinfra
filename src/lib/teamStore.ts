export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification?: string;
  experience: string;
  email: string;
  photo: string;
  accent: string;
}

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "upender",
    name: "Mr. B. Upender Reddy",
    role: "Managing Director",
    experience: "28+ Years",
    email: "info@aaspacesinfra.com",
    photo: "/assets/team/upender-reddy.jpg",
    accent: "#0f2b48",
    qualification: "",
  },
  {
    id: "gangadhar",
    name: "Mr. Ch. Gangadhar",
    role: "Executive Director",
    qualification: "M.Tech. Structures",
    experience: "10+ Years",
    email: "gangadhar@aaspacesinfra.com",
    photo: "/assets/team/gangadhar.jpg",
    accent: "#0284c7",
  },
];

const TEAM_STORAGE_KEY = "aa_spaces_team";

export function getTeamMembers(): TeamMember[] {
  if (typeof window === "undefined") return DEFAULT_TEAM;
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    if (!raw) return DEFAULT_TEAM;
    const overrides: Record<string, Partial<TeamMember>> = JSON.parse(raw);
    return DEFAULT_TEAM.map((m) => {
      const custom = overrides[m.id];
      return custom ? { ...m, ...custom } : m;
    });
  } catch {
    return DEFAULT_TEAM;
  }
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    const overrides: Record<string, Partial<TeamMember>> = raw ? JSON.parse(raw) : {};
    overrides[id] = { ...(overrides[id] || {}), ...updates };
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  } catch (err) {
    console.error("Failed to save team member:", err);
  }
}

export function resetTeamMembers(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TEAM_STORAGE_KEY);
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  } catch {}
}
