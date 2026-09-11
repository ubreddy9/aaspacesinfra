/**
 * projectStore.ts — Cloud-backed project CRUD via Supabase
 *
 * All projects (including the 5 defaults) live in Supabase.
 * Admin can edit or delete any project, including defaults.
 * Images are uploaded to Supabase Storage → public URL stored in DB.
 */
import { supabase, STORAGE_BUCKET } from './supabaseClient';

export interface Project {
  id: string;
  code: string;
  title: string;
  sector: string;
  filter: string;
  location: string;
  area: string;
  description: string;
  image: string;          // public URL (Supabase Storage or external)
  status: 'active' | 'draft';
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// ─── DEFAULT SEED DATA ──────────────────────────────────────────────────────
// These are inserted into Supabase once (via seedDefaultProjects).
// After that, all edits/deletes go through Supabase.
export const DEFAULT_PROJECTS_SEED = [
  {
    code: 'WH-001',
    title: 'Large-span Industrial Warehouse',
    sector: 'Warehouse',
    filter: 'warehouse',
    location: 'Hyderabad, Telangana',
    area: '18,000 sq ft',
    description: 'A clear-span warehouse with 24 m bay widths optimised for heavy forklift operation and dock-height loading.',
    image: '/airo-assets/images/pages/home/capabilities-warehouse',
    status: 'active' as const,
    is_default: true,
  },
  {
    code: 'CM-002',
    title: 'Multi-tenant Commercial Block',
    sector: 'Commercial',
    filter: 'commercial',
    location: 'Bengaluru, Karnataka',
    area: '11,500 sq ft',
    description: 'A two-storey PEB commercial structure with curtain-wall glazing, designed for retail ground floor and office above.',
    image: '/airo-assets/images/pages/home/capabilities-commercial',
    status: 'active' as const,
    is_default: true,
  },
  {
    code: 'HP-003',
    title: 'Resort Convention Pavilion',
    sector: 'Hospitality',
    filter: 'hospitality',
    location: 'Vizag, Andhra Pradesh',
    area: '9,200 sq ft',
    description: 'A column-free convention space with exposed steel trusses, designed for events up to 800 delegates.',
    image: '/airo-assets/images/pages/home/capabilities-hospitality',
    status: 'active' as const,
    is_default: true,
  },
  {
    code: 'ID-004',
    title: 'Heavy Industry Fabrication Hall',
    sector: 'Industrial',
    filter: 'industrial',
    location: 'Pune, Maharashtra',
    area: '24,000 sq ft',
    description: 'Overhead crane-ready fabrication hall with 8-tonne crane beam rails, mezzanine control room and personnel access.',
    image: '/airo-assets/images/pages/home/hero',
    status: 'active' as const,
    is_default: true,
  },
  {
    code: 'CV-005',
    title: 'Event Convention Centre',
    sector: 'Convention',
    filter: 'convention',
    location: 'Chennai, Tamil Nadu',
    area: '31,000 sq ft',
    description: 'A landmark convention centre using long-span PEB frames with integrated acoustic wall panels and climate control.',
    image: '/airo-assets/images/pages/home/gallery-convention',
    status: 'active' as const,
    is_default: true,
  },
];

// ─── READ ───────────────────────────────────────────────────────────────────

/** Fetch all active projects from Supabase, sorted newest first. */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[projectStore] getProjects error:', error.message);
    return [];
  }
  return (data ?? []) as Project[];
}

/** Fetch only active projects (for public pages). */
export async function getActiveProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[projectStore] getActiveProjects error:', error.message);
    return [];
  }
  return (data ?? []) as Project[];
}

// ─── IMAGE UPLOAD ───────────────────────────────────────────────────────────

/**
 * Upload a File to Supabase Storage and return the public URL.
 * Throws an error string if upload fails.
 */
export async function uploadProjectImage(
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Simulate progress start
  onProgress?.(10);

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  onProgress?.(90);

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  onProgress?.(100);
  return data.publicUrl;
}

// ─── WRITE ──────────────────────────────────────────────────────────────────

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

/** Insert a new project row into Supabase. */
export async function addProject(data: ProjectInput): Promise<Project> {
  const { data: row, error } = await supabase
    .from('projects')
    .insert({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(`Add project failed: ${error.message}`);
  return row as Project;
}

/** Update any project (including defaults) by ID. */
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'created_at'>>
): Promise<Project> {
  const { data: row, error } = await supabase
    .from('projects')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Update project failed: ${error.message}`);
  return row as Project;
}

/** Delete any project by ID. */
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(`Delete project failed: ${error.message}`);
}

// ─── SEED ───────────────────────────────────────────────────────────────────

/**
 * Run once to insert the 5 default projects into Supabase.
 * Safe to call multiple times — checks if defaults already exist first.
 */
export async function seedDefaultProjects(): Promise<string> {
  const { count } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('is_default', true);

  if ((count ?? 0) >= DEFAULT_PROJECTS_SEED.length) {
    return 'Defaults already seeded.';
  }

  const { error } = await supabase
    .from('projects')
    .insert(DEFAULT_PROJECTS_SEED);

  if (error) throw new Error(`Seed failed: ${error.message}`);
  return `Seeded ${DEFAULT_PROJECTS_SEED.length} default projects.`;
}

// ─── AUTH (PIN-based, stored in sessionStorage) ──────────────────────────────

const AUTH_KEY = 'aa_spaces_admin_auth';
const DEFAULT_PIN = 'admin2024';

export function checkAdminAuth(): boolean {
  try { return sessionStorage.getItem(AUTH_KEY) === 'ok'; }
  catch { return false; }
}

export function loginAdmin(pin: string): boolean {
  const ok = pin === DEFAULT_PIN;
  if (ok) { try { sessionStorage.setItem(AUTH_KEY, 'ok'); } catch { /**/ } }
  return ok;
}

export function logoutAdmin(): void {
  try { sessionStorage.removeItem(AUTH_KEY); } catch { /**/ }
}
