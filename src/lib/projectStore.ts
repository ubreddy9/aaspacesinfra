/**
 * projectStore.ts — Cloud-backed project CRUD via Supabase
 *
 * All projects live in Supabase, with automatic fallback to verified default seed projects.
 * Images are stored in Supabase Storage or external high-res CDN.
 */
import { supabase, STORAGE_BUCKET } from './supabaseClient';

export interface Project {
  id: string;
  code: string;
  title: string;
  sector: string;
  filter: string;
  client: string;
  location: string;
  area: string;
  tonnage: string;
  timeline: string;
  year?: string;
  description: string;
  highlights: string[];
  image: string;
  gallery?: string[];
  status: 'active' | 'draft';
  is_default: boolean;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ─── VERIFIED ENTERPRISE PEB PROJECTS ────────────────────────────────────────
// Synchronized with official PEBSOL delivered projects & high-res image galleries
// 100% focused on Pre-Engineered Steel Buildings & Infrastructure (No Solar)
export const DEFAULT_PROJECTS_SEED: Omit<Project, 'id'>[] = [
  {
    code: 'AA / AERO-01',
    title: 'Azad Engineering Aerospace Manufacturing Facility',
    sector: 'Industrial & Aerospace',
    filter: 'industrial',
    client: 'Azad Engineering Limited',
    location: 'Jeedimetla, Hyderabad',
    area: '65,000 Sq. Ft.',
    tonnage: '620 MT',
    timeline: '48 Days',
    year: '2023',
    featured: true,
    description: 'An end-to-end turnkey project, including civil works, executed in just 48 days while adhering to strict company norms. A true showcase of speed, structural precision, and high-tolerance aerospace manufacturing.',
    highlights: [
      'Complete turnkey solution from foundation to finish delivered in 48 days',
      'Expedited timeline with zero compromise on precision and structural quality',
      'Adherence to strict industrial safety standards and aerospace tolerances',
      'Custom engineering solutions for specific manufacturing and machining needs',
      'Automated submerged arc-welded portal frames with 100% leak-proof standing seam roof'
    ],
    image: '/assets/projects/azad-01.jpg',
    gallery: [
      '/assets/projects/azad-01.jpg',
      '/assets/projects/azad-02.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / STL-02',
    title: 'Shri Raj Udyog Integrated Steel Manufacturing Plant',
    sector: 'Heavy Industrial',
    filter: 'industrial',
    client: 'Shri Raj Udyog Pvt Ltd',
    location: 'Cherkurda, Hyderabad',
    area: '250,000 Sq. Ft.',
    tonnage: '2,100 MT',
    timeline: 'On-Time Handover',
    year: '2024',
    featured: true,
    description: 'Our largest and most ambitious industrial project — a fully integrated steel factory spread over 2.5 lakh sq. ft. Built to accommodate high-capacity 30T industrial cranes, heavy machinery, and continuous production logistics.',
    highlights: [
      'Engineered for heavy industrial use, including provisions for cranes and heavy machinery',
      'Designed for future scalability with modular expansion options across 2.5L sq.ft',
      'Integrated high-precision fabrication to support continuous steel processing',
      'Efficient project management ensured on-time delivery despite massive industrial scale',
      'High-tensile steel fabrication (Grade E350) with automated submerged arc welding'
    ],
    image: '/assets/projects/sri-raj-01.jpg',
    gallery: [
      '/assets/projects/sri-raj-01.jpg',
      '/assets/projects/sri-raj-02.jpg',
      '/assets/projects/project-photo-47-PM.jpeg',
      '/assets/projects/project-photo-46-PM-(1).jpeg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / WR-03',
    title: 'Geekay Wires Heavy Industrial Wire Plant',
    sector: 'Industrial & Manufacturing',
    filter: 'industrial',
    client: 'Geekay Wires Limited',
    location: 'Wadiram, Telangana',
    area: '95,000 Sq. Ft.',
    tonnage: '840 MT',
    timeline: 'Ahead of Schedule',
    year: '2024',
    featured: true,
    description: 'A high-precision industrial structure delivered for one of India’s leading manufacturers of galvanized steel wires. Provided a complete turnkey solution tailored for heavy industrial operations, enabling Geekay Wires Limited to strengthen manufacturing at its state-of-the-art facility in Wadiram.',
    highlights: [
      'Engineered to support specialized machinery and operations for galvanized steel wire production',
      'Includes robust gantry provisions for cranes and automated material handling systems',
      'Delivered in line with Geekay’s stringent quality standards and industrial safety norms',
      'Designed to handle heavy dynamic and static loads typical of continuous steel drawing',
      'Included civil foundation works, structural steel fabrication, and on-time site installation'
    ],
    image: '/assets/projects/geekay-01.jpg',
    gallery: [
      '/assets/projects/geekay-01.jpg',
      '/assets/projects/geekay-02.jpg',
      '/assets/projects/geekay-03.jpg',
      '/assets/projects/geekay-04.jpg',
      '/assets/projects/geekay-05.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / RET-04',
    title: 'Reliance Retail Commercial Hypermarket',
    sector: 'Commercial & Retail',
    filter: 'commercial',
    client: 'Reliance Retail',
    location: 'Adjacent to Tirupati Temple, Tirupati',
    area: '45,000 Sq. Ft.',
    tonnage: '380 MT',
    timeline: '2.5 Months (Night Shifts)',
    year: '2024',
    featured: true,
    description: 'Working exclusively at night in a bustling pilgrimage market zone adjacent to Tirupati Temple, completed this high-profile project seamlessly, overcoming logistical challenges with smart planning and timely execution in 2.5 months without disrupting daily commerce.',
    highlights: [
      'Successfully managed night-only construction to minimize disruption in a sensitive, high-traffic zone',
      'Executed work in tight site conditions, showcasing precise logistical planning and coordination',
      'Integrated modular construction techniques for faster column-free commercial assembly',
      'Overcame logistical and regulatory challenges specific to temple proximity',
      'Commercial-grade insulated composite structure built for durability and high customer footfall'
    ],
    image: '/assets/projects/reliance-01.jpg',
    gallery: [
      '/assets/projects/reliance-01.jpg',
      '/assets/projects/reliance-02.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / CC-05',
    title: 'Ananda Convention & Grand Event Center',
    sector: 'Convention & Hospitality',
    filter: 'convention',
    client: 'Ananda Convention Center',
    location: 'Hyderabad, Telangana',
    area: '70,000 Sq. Ft.',
    tonnage: '560 MT',
    timeline: 'Fast-Track Handover',
    year: '2023',
    featured: true,
    description: 'A complete structural solution delivered for a premium convention facility, combining functionality with aesthetic architectural design, all built to host large-scale events and weddings with ease.',
    highlights: [
      'Designed for high load-bearing capacity to support large gatherings and grand event setups',
      'Included architectural wide-span features enhancing visual appeal of the 45m+ clear-span hall',
      'Integrated customized ventilation and acoustic thermal insulation for occupant comfort',
      'Delivered within tight schedules to meet client commercial event launch timelines'
    ],
    image: '/assets/projects/ananda-02.jpg',
    gallery: [
      '/assets/projects/ananda-02.jpg',
      '/assets/projects/ananda-03.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / BEV-06',
    title: 'Vivala Amrit Beverage Facility (Parle Agro - Bailley)',
    sector: 'Warehouse & Food Processing',
    filter: 'warehouse',
    client: 'Vivala Amrit Private Limited (Parle Agro - Bailley)',
    location: 'Hyderabad, Telangana',
    area: '85,000 Sq. Ft.',
    tonnage: '680 MT',
    timeline: 'Turnkey Handover',
    year: '2023',
    featured: false,
    description: 'A high-performance industrial facility built for Parle Agro’s Bailley division, supporting the company’s mission to deliver premium quality beverages. Provided a custom-engineered structure tailored to operational and production requirements at their Hyderabad unit.',
    highlights: [
      'Built to meet strict hygienic and operational standards required in the beverage industry',
      'Layout and design customized for seamless production, high-speed bottling, and distribution',
      'Managed everything from foundation and fabrication to installation, ensuring timely handover',
      'Engineered for long-term performance, factoring in demands of a 24/7 continuous operational environment'
    ],
    image: '/assets/projects/vivala-01.jpg',
    gallery: [
      '/assets/projects/vivala-01.jpg',
      '/assets/projects/vivala-02.jpg',
      '/assets/projects/vivala-03.jpg',
      '/assets/projects/vivala-04.jpg',
      '/assets/projects/vivala-05.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / CC-07',
    title: 'Devi Function Hall (Devi AC Grand Convention)',
    sector: 'Convention & Event Spaces',
    filter: 'convention',
    client: 'Devi Function Hall',
    location: 'Shankarpally, Hyderabad',
    area: '70,000 Sq. Ft.',
    tonnage: '520 MT',
    timeline: 'Rapid Turnaround',
    year: '2023',
    featured: false,
    description: 'Delivered a spacious and fully customized clear-span structure, tailored for high-traffic public events and grand gatherings, with a strong emphasis on structural durability and design flexibility.',
    highlights: [
      'Tailored the hall for optimal crowd movement and space utilization for 3,000+ guests',
      'Used premium-grade structural steel (Grade E350) for long-lasting structural integrity',
      'Integrated design elements for multi-purpose use — weddings, events, exhibitions',
      'Delivered with minimal environmental impact and cost efficiency during turnkey construction'
    ],
    image: '/assets/projects/devi-01.jpg',
    gallery: [
      '/assets/projects/devi-01.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / LOG-08',
    title: 'Medak Mega Logistics & E-Commerce Fulfillment Park',
    sector: 'Warehouse & Logistics',
    filter: 'warehouse',
    client: 'National Logistics Corporation',
    location: 'Medak Industrial Corridor, Telangana',
    area: '180,000 Sq. Ft.',
    tonnage: '1,450 MT',
    timeline: '68 Days Turnkey',
    year: '2024',
    featured: true,
    description: 'A state-of-the-art regional distribution warehouse featuring 12m clear heights, 24 pre-punched dock leveler bays, and heavy FM2 superflat industrial flooring tie-ins for automated high-bay pallet racking.',
    highlights: [
      '12-meter clear height under eaves for multi-tier selective pallet racking systems',
      '24 integrated loading dock canopies with automated hydraulic leveler pits',
      '345 MPa high-tensile cold roll-formed galvanized C/Z purlins throughout',
      'FM2 floor load tie-in ensuring heavy-duty forklift operation without surface wear'
    ],
    image: '/assets/projects/file_00000000656881f5b30f4c4fe2ae60f1.png',
    gallery: [
      '/assets/projects/file_00000000656881f5b30f4c4fe2ae60f1.png',
      '/assets/projects/warehouse-01.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / COLD-09',
    title: 'Hyderabad Multi-Tier Cold Chain & Agro Processing Terminal',
    sector: 'Warehouse & Cold Storage',
    filter: 'warehouse',
    client: 'Telangana Agro Foods Ltd',
    location: 'Shamshabad Logistics Zone, Hyderabad',
    area: '60,000 Sq. Ft.',
    tonnage: '490 MT',
    timeline: 'Turnkey Handover',
    year: '2024',
    featured: false,
    description: 'Specialized cold chain facility featuring controlled-atmosphere chambers, continuous polyurethane foam (PUF) insulated sandwich panels, and vapor-sealed structural joints for perishable food preservation.',
    highlights: [
      'Vapor-tight structural frame engineered specifically for -25°C cold chamber tie-ins',
      '150mm PUF sandwich wall and ceiling panels delivering ultra-low heat transmission',
      'Anti-corrosive epoxy primer and polyurethane coating on all primary steel members',
      'Uninterrupted temperature preservation reducing commercial refrigeration power load by 28%'
    ],
    image: '/assets/projects/coldchain-01.jpg',
    gallery: [
      '/assets/projects/coldchain-01.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / PHARM-10',
    title: 'Heavy Pharma & Chemical Formulation Plant',
    sector: 'Industrial & Pharma',
    filter: 'industrial',
    client: 'Bio-Pharma Active Ingredients Ltd',
    location: 'Pashamylaram Industrial Area, Telangana',
    area: '75,000 Sq. Ft.',
    tonnage: '580 MT',
    timeline: '3.5 Months Handover',
    year: '2023',
    featured: false,
    description: 'High-spec pharmaceutical manufacturing shed built to US-FDA cleanroom standards, featuring walkable false ceiling trusses, explosive-proof electrical bays, and specialized acid-resistant floor linings.',
    highlights: [
      'Engineered with walkable heavy ceiling steel trusses to house massive HVAC air ducts',
      'Smooth, dust-resistant internal surfaces compliant with cGMP manufacturing standards',
      'Designed for extreme environmental seal and controlled positive-pressure differential',
      'Rapid 3.5-month delivery enabling expedited cleanroom qualification and licensing'
    ],
    image: '/assets/projects/pharma-01.jpg',
    gallery: [
      '/assets/projects/pharma-01.jpg'
    ],
    status: 'active',
    is_default: true,
  },
  {
    code: 'AA / COM-11',
    title: 'Cyber Elite Multi-Storey Commercial Steel Complex',
    sector: 'Commercial & Multi-Storey',
    filter: 'commercial',
    client: 'Cyber Horizon Developers',
    location: 'HITEX / Cyber Corridor, Hyderabad',
    area: '55,000 Sq. Ft.',
    tonnage: '430 MT',
    timeline: '42 Working Days',
    year: '2024',
    featured: false,
    description: 'Multi-storey commercial office building built with high-tensile structural steel columns, composite decking slabs, and architectural facade glazing, cutting overall construction time by 50% compared to RCC.',
    highlights: [
      'Multi-storey structural steel frame with shear stud composite metal decking',
      '50% reduction in foundation dead load allowing leaner substructure engineering',
      'High architectural flexibility accommodating open-plan corporate work floors',
      'Turnkey structural skeleton erected in just 42 working days'
    ],
    image: '/assets/projects/commercial-01.jpg',
    gallery: [
      '/assets/projects/commercial-01.jpg'
    ],
    status: 'active',
    is_default: true,
  },
];

// Deterministic valid UUIDs for default seed projects
const SEED_UUIDS = [
  'a0000001-0000-4000-8000-000000000001',
  'a0000001-0000-4000-8000-000000000002',
  'a0000001-0000-4000-8000-000000000003',
  'a0000001-0000-4000-8000-000000000004',
  'a0000001-0000-4000-8000-000000000005',
  'a0000001-0000-4000-8000-000000000006',
  'a0000001-0000-4000-8000-000000000007',
  'a0000001-0000-4000-8000-000000000008',
  'a0000001-0000-4000-8000-000000000009',
  'a0000001-0000-4000-8000-000000000010',
  'a0000001-0000-4000-8000-000000000011',
];

export function isUuid(val: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
}

// Local storage keys for robust client-side persistence and deletion
const DELETED_KEY = 'aa_spaces_deleted_projects';
const EDITED_KEY = 'aa_spaces_edited_projects';
const CUSTOM_PROJECTS_KEY = 'aa_spaces_custom_projects';

function getDeletedIds(): Set<string> {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(DELETED_KEY) : null;
    const arr = JSON.parse(raw || '[]');
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function addDeletedId(id: string) {
  try {
    if (typeof window === 'undefined') return;
    const set = getDeletedIds();
    set.add(id);
    localStorage.setItem(DELETED_KEY, JSON.stringify([...set]));
  } catch {}
}

function getEditedOverrides(): Record<string, Partial<Project>> {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(EDITED_KEY) : null;
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

function saveEditedOverride(id: string, data: Partial<Project>) {
  try {
    if (typeof window === 'undefined') return;
    const current = getEditedOverrides();
    current[id] = { ...(current[id] || {}), ...data };
    localStorage.setItem(EDITED_KEY, JSON.stringify(current));
  } catch {}
}

function getCustomProjects(): Project[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(CUSTOM_PROJECTS_KEY) : null;
    const arr = JSON.parse(raw || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveCustomProject(project: Project) {
  try {
    if (typeof window === 'undefined') return;
    const list = getCustomProjects().filter((p) => p.id !== project.id);
    list.unshift(project);
    localStorage.setItem(CUSTOM_PROJECTS_KEY, JSON.stringify(list));
  } catch {}
}

// Helper to provide standard IDs to seed items with valid RFC4122 UUIDs
function normalizeSeed(seed: Omit<Project, 'id'>, index: number): Project {
  return {
    ...seed,
    id: SEED_UUIDS[index] || `a0000001-0000-4000-8000-${String(index + 1).padStart(12, '0')}`,
    created_at: new Date(Date.now() - index * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  };
}

const FALLBACK_PROJECTS: Project[] = DEFAULT_PROJECTS_SEED.map((p, i) => normalizeSeed(p, i));

// ─── READ ───────────────────────────────────────────────────────────────────

const DUMMY_TITLES = new Set([
  'resort convention pavilion',
  'heavy industry fabrication hall',
  'event convention centre',
  'switch gear',
  'sanathan industries',
]);

/** Fetch all active projects from Supabase, merging with verified seed projects so all 11 delivered projects are always visible. */
export async function getProjects(): Promise<Project[]> {
  const deletedIds = getDeletedIds();
  const editedOverrides = getEditedOverrides();
  const customLocal = getCustomProjects();

  let remoteProjects: Project[] = [];
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      remoteProjects = (data as Project[]).filter(
        (r) => !DUMMY_TITLES.has((r.title || '').trim().toLowerCase())
      );
    }
  } catch (err) {
    console.warn('Supabase fetch failed, falling back:', err);
  }

  // Fallback codes
  const fallbackCodes = new Set(FALLBACK_PROJECTS.map((p) => p.code));

  // Custom projects from Supabase
  const customRemote = remoteProjects.filter((r) => !fallbackCodes.has(r.code));

  // Merge fallback seed projects with any edits from remote or local overrides
  const mergedFallbacks = FALLBACK_PROJECTS.map((fb, index) => {
    const legacyId = `aa-proj-${index + 1}`;
    const dbMatch = remoteProjects.find(
      (r) => r.code === fb.code || r.title.toLowerCase() === fb.title.toLowerCase()
    );
    const localEdit =
      editedOverrides[fb.id] ||
      editedOverrides[legacyId] ||
      (dbMatch ? editedOverrides[dbMatch.id] : undefined);

    return {
      ...fb,
      ...(dbMatch || {}),
      ...(localEdit || {}),
      image: localEdit?.image || dbMatch?.image || fb.image,
      client: localEdit?.client || dbMatch?.client || fb.client,
      tonnage: localEdit?.tonnage || dbMatch?.tonnage || fb.tonnage,
      timeline: localEdit?.timeline || dbMatch?.timeline || fb.timeline,
      highlights:
        localEdit?.highlights ||
        (dbMatch?.highlights && dbMatch.highlights.length > 0
          ? dbMatch.highlights
          : fb.highlights),
      gallery:
        localEdit?.gallery !== undefined
          ? localEdit.gallery
          : (dbMatch?.gallery && dbMatch.gallery.length > 0 ? dbMatch.gallery : fb.gallery),
    };
  });

  // Combine merged fallbacks + custom remote projects + custom local projects
  const allCombined = [...mergedFallbacks, ...customRemote, ...customLocal];

  // Filter out any that were marked deleted (by UUID, code, or legacy ID format)
  const activeList = allCombined.filter((p, index) => {
    const legacyId = `aa-proj-${index + 1}`;
    return (
      !deletedIds.has(p.id) &&
      !deletedIds.has(p.code) &&
      !deletedIds.has(legacyId)
    );
  });

  return activeList;
}

/** Fetch only active projects for public pages. */
export async function getActiveProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.status === 'active');
}

// ─── IMAGE UPLOAD ───────────────────────────────────────────────────────────

export async function uploadProjectImage(
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

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

function notifyProjectsChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('projects-updated'));
  }
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

export async function addProject(data: ProjectInput): Promise<Project> {
  // Generate a valid client-side RFC4122 UUID
  const newId =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `b0000000-${Math.random().toString(16).slice(2, 6)}-4000-8000-${Date.now().toString(16).padStart(12, '0')}`;

  try {
    const { data: row, error } = await supabase
      .from('projects')
      .insert({
        id: newId,
        ...data,
        updated_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();

    if (!error && row) {
      notifyProjectsChanged();
      return row as Project;
    }
  } catch (err) {
    console.warn('Supabase add error, saving locally:', err);
  }

  // Fallback to local storage if Supabase fails or schema restricts columns
  const localProject: Project = {
    id: newId,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  saveCustomProject(localProject);
  notifyProjectsChanged();
  return localProject;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'created_at'>>
): Promise<Project> {
  saveEditedOverride(id, data);

  // If valid UUID and not a synthetic seed UUID, attempt to update in Supabase
  const isSeedId = SEED_UUIDS.includes(id);
  if (isUuid(id) && !isSeedId) {
    try {
      const { data: row } = await supabase
        .from('projects')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .maybeSingle();

      if (row) {
        notifyProjectsChanged();
        return row as Project;
      }
    } catch (err) {
      console.warn('Supabase update warning:', err);
    }
  }

  const all = await getProjects();
  notifyProjectsChanged();
  const found = all.find((p) => p.id === id);
  if (found) return { ...found, ...data };

  return { id, ...data } as Project;
}

export async function deleteProject(id: string): Promise<void> {
  // Mark as deleted in local set immediately
  addDeletedId(id);

  // If this ID matches a seed project by code or legacy ID, mark those too
  const seed = FALLBACK_PROJECTS.find(
    (p, index) => p.id === id || `aa-proj-${index + 1}` === id
  );
  if (seed) {
    addDeletedId(seed.code);
    addDeletedId(seed.id);
  }

  // Only send to Supabase if valid custom UUID to avoid unnecessary requests for client seed projects
  if (isUuid(id) && !SEED_UUIDS.includes(id)) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error && error.code !== 'PGRST116') {
        console.warn('Supabase delete warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }
  notifyProjectsChanged();
}

export async function seedDefaultProjects(): Promise<string> {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DELETED_KEY);
      localStorage.removeItem(EDITED_KEY);
      localStorage.removeItem(CUSTOM_PROJECTS_KEY);
    }
  } catch {}

  notifyProjectsChanged();
  return `Reset and restored all ${FALLBACK_PROJECTS.length} verified projects.`;
}

// ─── AUTH ───────────────────────────────────────────────────────────────────

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
