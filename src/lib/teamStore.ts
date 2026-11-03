export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification?: string;
  experience: string;
  email: string;
  photo: string;
  accent?: string;
  bio?: string;
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

const CUSTOM_TEAM_KEY = "aa_spaces_custom_team";
const EDITED_TEAM_KEY = "aa_spaces_edited_team";
const DELETED_TEAM_KEY = "aa_spaces_deleted_team";

function getDeletedTeamIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(DELETED_TEAM_KEY);
    const arr = JSON.parse(raw || "[]");
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function getEditedTeamOverrides(): Record<string, Partial<TeamMember>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(EDITED_TEAM_KEY);
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

function getCustomTeamMembers(): TeamMember[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_TEAM_KEY);
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function getTeamMembers(): TeamMember[] {
  if (typeof window === "undefined") return DEFAULT_TEAM;
  try {
    const deleted = getDeletedTeamIds();
    const overrides = getEditedTeamOverrides();
    const custom = getCustomTeamMembers();

    // Default members (filtered and overridden)
    const baseList = DEFAULT_TEAM
      .filter((m) => !deleted.has(m.id))
      .map((m) => (overrides[m.id] ? { ...m, ...overrides[m.id] } : m));

    // Custom added members (filtered and overridden)
    const customList = custom
      .filter((m) => !deleted.has(m.id))
      .map((m) => (overrides[m.id] ? { ...m, ...overrides[m.id] } : m));

    return [...baseList, ...customList];
  } catch {
    return DEFAULT_TEAM;
  }
}

export function addTeamMember(data: Omit<TeamMember, "id">): TeamMember {
  const newId = `team-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const newMember: TeamMember = {
    ...data,
    id: newId,
    accent: data.accent || "#0f2b48",
  };

  if (typeof window !== "undefined") {
    try {
      const current = getCustomTeamMembers();
      current.push(newMember);
      localStorage.setItem(CUSTOM_TEAM_KEY, JSON.stringify(current));
      window.dispatchEvent(new Event("aa_spaces_team_updated"));
    } catch (e) {
      console.error("Failed to add team member:", e);
    }
  }

  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): void {
  if (typeof window === "undefined") return;
  try {
    // 1. Update in edited overrides
    const overrides = getEditedTeamOverrides();
    overrides[id] = { ...(overrides[id] || {}), ...updates };
    localStorage.setItem(EDITED_TEAM_KEY, JSON.stringify(overrides));

    // 2. Also update in custom team list if it's a custom member
    const customList = getCustomTeamMembers();
    const idx = customList.findIndex((m) => m.id === id);
    if (idx !== -1) {
      customList[idx] = { ...customList[idx], ...updates };
      localStorage.setItem(CUSTOM_TEAM_KEY, JSON.stringify(customList));
    }

    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  } catch (err) {
    console.error("Failed to save team member:", err);
  }
}

export function deleteTeamMember(id: string): void {
  if (typeof window === "undefined") return;
  try {
    // Add to deleted set
    const deleted = getDeletedTeamIds();
    deleted.add(id);
    localStorage.setItem(DELETED_TEAM_KEY, JSON.stringify([...deleted]));

    // Also remove from custom list if present
    const customList = getCustomTeamMembers().filter((m) => m.id !== id);
    localStorage.setItem(CUSTOM_TEAM_KEY, JSON.stringify(customList));

    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  } catch (err) {
    console.error("Failed to delete team member:", err);
  }
}

export function resetTeamMembers(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CUSTOM_TEAM_KEY);
    localStorage.removeItem(EDITED_TEAM_KEY);
    localStorage.removeItem(DELETED_TEAM_KEY);
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  } catch (err) {
    console.error("Failed to reset team members:", err);
  }
}
