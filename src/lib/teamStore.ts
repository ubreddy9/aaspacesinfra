import { supabase } from "./supabaseClient";

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

const TEAM_UUID_MAP: Record<string, string> = {
  upender: "e0000000-0000-4000-8000-000000000001",
  gangadhar: "e0000000-0000-4000-8000-000000000002",
};

function memberIdToUuid(id: string): string {
  if (TEAM_UUID_MAP[id]) return TEAM_UUID_MAP[id];
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return id;
  }
  return `e0000000-${Math.random().toString(16).slice(2, 6)}-4000-8000-${Date.now().toString(16).padStart(12, "0")}`;
}

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

// In-memory cache for fast SSR / synchronous render
let cachedTeam: TeamMember[] = DEFAULT_TEAM;
let hasSyncedFromCloud = false;

function buildLocalTeamList(): TeamMember[] {
  const deleted = getDeletedTeamIds();
  const overrides = getEditedTeamOverrides();
  const custom = getCustomTeamMembers();

  const baseList = DEFAULT_TEAM
    .filter((m) => !deleted.has(m.id))
    .map((m) => (overrides[m.id] ? { ...m, ...overrides[m.id] } : m));

  const customList = custom
    .filter((m) => !deleted.has(m.id))
    .map((m) => (overrides[m.id] ? { ...m, ...overrides[m.id] } : m));

  return [...baseList, ...customList];
}

/** Synchronous getter returning latest cached or local team */
export function getTeamMembers(): TeamMember[] {
  if (typeof window === "undefined") return DEFAULT_TEAM;

  if (!hasSyncedFromCloud) {
    // Trigger background sync from Supabase
    fetchTeamFromCloud();
  }

  return cachedTeam && cachedTeam.length > 0 ? cachedTeam : buildLocalTeamList();
}

/** Async cloud fetch from Supabase (runs on page load so all devices see the same members) */
export async function fetchTeamFromCloud(): Promise<TeamMember[]> {
  hasSyncedFromCloud = true;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("sector", "team")
      .order("created_at", { ascending: true });

    if (!error && data && data.length > 0) {
      const cloudMembers: TeamMember[] = [];
      const deleted = getDeletedTeamIds();

      for (const row of data) {
        let member: TeamMember | null = null;
        if (typeof row.description === "string" && row.description.trim().startsWith("{")) {
          try {
            member = JSON.parse(row.description);
          } catch {}
        }

        if (!member) {
          member = {
            id: row.id,
            name: row.title || "Team Member",
            role: row.location || "Executive",
            experience: row.area || "5+ Years",
            email: "info@aaspacesinfra.com",
            photo: row.image || "/assets/brand/logo.png",
          };
        }

        if (member && !deleted.has(member.id)) {
          cloudMembers.push(member);
        }
      }

      if (cloudMembers.length > 0) {
        cachedTeam = cloudMembers;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("aa_spaces_team_updated"));
        }
        return cloudMembers;
      }
    }
  } catch (err) {
    console.warn("Could not fetch team from cloud:", err);
  }

  cachedTeam = buildLocalTeamList();
  return cachedTeam;
}

export async function addTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
  const newUuid = `e0000000-${Math.random().toString(16).slice(2, 6)}-4000-8000-${Date.now().toString(16).padStart(12, "0")}`;
  const newMember: TeamMember = {
    ...data,
    id: newUuid,
    accent: data.accent || "#0f2b48",
  };

  // 1. Save to local storage
  if (typeof window !== "undefined") {
    try {
      const current = getCustomTeamMembers().filter((m) => m.id !== newUuid);
      current.push(newMember);
      localStorage.setItem(CUSTOM_TEAM_KEY, JSON.stringify(current));
    } catch {}
  }

  // 2. Save directly to Supabase cloud
  try {
    await supabase.from("projects").upsert({
      id: newUuid,
      code: "TEAM_MEMBER",
      title: newMember.name,
      sector: "team",
      filter: "team",
      location: newMember.role,
      area: newMember.experience,
      description: JSON.stringify(newMember),
      image: newMember.photo,
      status: "active",
      is_default: false,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Could not sync added team member to cloud:", err);
  }

  cachedTeam = [...cachedTeam.filter((m) => m.id !== newUuid), newMember];
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  }

  return newMember;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<void> {
  // 1. Update in local storage
  if (typeof window !== "undefined") {
    try {
      const overrides = getEditedTeamOverrides();
      overrides[id] = { ...(overrides[id] || {}), ...updates };
      localStorage.setItem(EDITED_TEAM_KEY, JSON.stringify(overrides));

      const customList = getCustomTeamMembers();
      const idx = customList.findIndex((m) => m.id === id);
      if (idx !== -1) {
        customList[idx] = { ...customList[idx], ...updates };
        localStorage.setItem(CUSTOM_TEAM_KEY, JSON.stringify(customList));
      }
    } catch {}
  }

  // Update in-memory
  const existing = cachedTeam.find((m) => m.id === id) || DEFAULT_TEAM.find((m) => m.id === id);
  const updatedMember: TeamMember = {
    ...(existing || {
      id,
      name: "Team Member",
      role: "Executive",
      experience: "5+ Years",
      email: "info@aaspacesinfra.com",
      photo: "/assets/brand/logo.png",
    }),
    ...updates,
  };

  cachedTeam = cachedTeam.map((m) => (m.id === id ? updatedMember : m));
  if (!cachedTeam.some((m) => m.id === id)) {
    cachedTeam.push(updatedMember);
  }

  // 2. Sync to Supabase cloud
  const cloudUuid = memberIdToUuid(id);
  try {
    await supabase.from("projects").upsert({
      id: cloudUuid,
      code: "TEAM_MEMBER",
      title: updatedMember.name,
      sector: "team",
      filter: "team",
      location: updatedMember.role,
      area: updatedMember.experience,
      description: JSON.stringify(updatedMember),
      image: updatedMember.photo,
      status: "active",
      is_default: id === "upender" || id === "gangadhar",
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Could not sync updated team member to cloud:", err);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  }
}

export async function deleteTeamMember(id: string): Promise<void> {
  // 1. Update local storage
  if (typeof window !== "undefined") {
    try {
      const deleted = getDeletedTeamIds();
      deleted.add(id);
      localStorage.setItem(DELETED_TEAM_KEY, JSON.stringify([...deleted]));

      const customList = getCustomTeamMembers().filter((m) => m.id !== id);
      localStorage.setItem(CUSTOM_TEAM_KEY, JSON.stringify(customList));
    } catch {}
  }

  cachedTeam = cachedTeam.filter((m) => m.id !== id);

  // 2. Delete from Supabase cloud
  const cloudUuid = memberIdToUuid(id);
  try {
    await supabase.from("projects").delete().eq("id", cloudUuid);
  } catch (err) {
    console.warn("Could not delete team member from cloud:", err);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  }
}

export async function resetTeamMembers(): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(CUSTOM_TEAM_KEY);
      localStorage.removeItem(EDITED_TEAM_KEY);
      localStorage.removeItem(DELETED_TEAM_KEY);
    } catch {}
  }

  // Delete all cloud team records so defaults take over
  try {
    await supabase.from("projects").delete().eq("sector", "team");
  } catch {}

  cachedTeam = DEFAULT_TEAM;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aa_spaces_team_updated"));
  }
}
