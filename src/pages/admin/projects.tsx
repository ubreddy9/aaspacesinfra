import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft, Check, Edit2, ImagePlus, Loader2,
  LogOut, Plus, Trash2, Upload, X, Users, RotateCcw, Camera
} from "lucide-react";
import {
  type Project,
  type ProjectInput,
  addProject,
  checkAdminAuth,
  deleteProject,
  getProjects,
  logoutAdmin,
  seedDefaultProjects,
  updateProject,
  uploadProjectImage,
} from "@/lib/projectStore";
import {
  getTeamMembers,
  fetchTeamFromCloud,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  resetTeamMembers,
  type TeamMember,
} from "@/lib/teamStore";

type Toast = { id: number; msg: string; type: "success" | "error" };
let toastId = 0;

const SECTORS = [
  "Warehouse", "Industrial", "Commercial", "Hospitality",
  "Convention", "Cold Storage", "Educational", "Healthcare",
];
const FILTER_MAP: Record<string, string> = {
  Warehouse: "warehouse", Industrial: "industrial", Commercial: "commercial",
  Hospitality: "hospitality", Convention: "convention", "Cold Storage": "cold-storage",
  Educational: "educational", Healthcare: "healthcare",
};

const emptyForm = (): Omit<ProjectInput, "is_default"> => ({
  code: "",
  title: "",
  sector: "Warehouse",
  filter: "warehouse",
  client: "",
  location: "",
  area: "",
  tonnage: "",
  timeline: "",
  year: "",
  description: "",
  image: "",
  gallery: [] as string[],
  highlights: [] as string[],
  status: "active",
});

export default function AdminProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadPct, setUploadPct] = useState(0);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"projects" | "team">("projects");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [teamDrawerOpen, setTeamDrawerOpen] = useState(false);
  const [teamPhotoPreview, setTeamPhotoPreview] = useState<string>("");
  const teamFileRef = useRef<HTMLInputElement>(null);

  const [isAddingNewTeam, setIsAddingNewTeam] = useState(false);
  const [deleteTeamTarget, setDeleteTeamTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!checkAdminAuth()) { navigate("/admin", { replace: true }); return; }
    loadProjects();
    setTeamMembers(getTeamMembers());
    fetchTeamFromCloud().then((m) => {
      if (m && m.length > 0) setTeamMembers(m);
    });
  }, []);

  async function loadProjects() {
    setLoading(true);
    const list = await getProjects();
    setProjects(list);
    setLoading(false);
  }

  function toast(msg: string, type: "success" | "error" = "success") {
    const id = ++toastId;
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setImageFile(null);
    setImagePreview("");
    setUploadPct(0);
    setNewGalleryUrl("");
    setDrawerOpen(true);
  }

  function openEdit(p: Project) {
    setEditingId(p.id);
    const existingGallery = (p.gallery && p.gallery.length > 0)
      ? [...p.gallery]
      : (p.image ? [p.image] : []);
    const cover = p.image || existingGallery[0] || "";

    setForm({
      code: p.code,
      title: p.title,
      sector: p.sector,
      filter: p.filter,
      client: p.client || "",
      location: p.location || "",
      area: p.area || "",
      tonnage: p.tonnage || "",
      timeline: p.timeline || "",
      year: p.year || "",
      description: p.description || "",
      image: cover,
      gallery: existingGallery,
      highlights: p.highlights || [],
      status: p.status,
    });
    setImageFile(null);
    setImagePreview(cover);
    setUploadPct(0);
    setNewGalleryUrl("");
    setDrawerOpen(true);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function onSectorChange(sector: string) {
    setForm((f) => ({ ...f, sector, filter: FILTER_MAP[sector] ?? sector.toLowerCase() }));
  }

  function setAsCover(url: string) {
    setForm((f) => ({ ...f, image: url }));
    setImagePreview(url);
    setImageFile(null);
    toast("Primary cover photo updated");
  }

  function openAddTeam() {
    setIsAddingNewTeam(true);
    setEditingTeamMember({
      id: "",
      name: "",
      role: "",
      qualification: "",
      experience: "5+ Years",
      email: "",
      photo: "",
      accent: "#0f2b48",
    });
    setTeamPhotoPreview("");
    setTeamDrawerOpen(true);
  }

  function openEditTeam(m: TeamMember) {
    setIsAddingNewTeam(false);
    setEditingTeamMember({ ...m });
    setTeamPhotoPreview(m.photo);
    setTeamDrawerOpen(true);
  }

  async function onTeamFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    // Immediate preview
    const previewUrl = URL.createObjectURL(f);
    setTeamPhotoPreview(previewUrl);

    // Upload directly to Supabase cloud storage so all devices can see it
    try {
      toast("Uploading photo to cloud storage...");
      const publicUrl = await uploadProjectImage(f);
      setTeamPhotoPreview(publicUrl);
      setEditingTeamMember((prev) => (prev ? { ...prev, photo: publicUrl } : null));
      toast("Photo uploaded to cloud successfully!");
    } catch (err) {
      console.warn("Cloud storage upload fallback:", err);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setTeamPhotoPreview(dataUrl);
        setEditingTeamMember((prev) => (prev ? { ...prev, photo: dataUrl } : null));
      };
      reader.readAsDataURL(f);
    }
  }

  async function handleSaveTeamMember() {
    if (!editingTeamMember) return;
    if (!editingTeamMember.name.trim()) {
      toast("Name is required", "error");
      return;
    }
    if (!editingTeamMember.role.trim()) {
      toast("Role / Designation is required", "error");
      return;
    }

    const finalPhoto = teamPhotoPreview || editingTeamMember.photo || "/assets/brand/logo.png";

    if (isAddingNewTeam) {
      await addTeamMember({
        name: editingTeamMember.name,
        role: editingTeamMember.role,
        qualification: editingTeamMember.qualification || "",
        experience: editingTeamMember.experience || "1+ Years",
        email: editingTeamMember.email || "info@aaspacesinfra.com",
        photo: finalPhoto,
        accent: "#0f2b48",
      });
      toast(`Added ${editingTeamMember.name} to cloud!`);
    } else {
      await updateTeamMember(editingTeamMember.id, {
        name: editingTeamMember.name,
        role: editingTeamMember.role,
        qualification: editingTeamMember.qualification,
        experience: editingTeamMember.experience,
        email: editingTeamMember.email,
        photo: finalPhoto,
      });
      toast(`Updated ${editingTeamMember.name} in cloud!`);
    }

    const updated = await fetchTeamFromCloud();
    setTeamMembers(updated);
    setTeamDrawerOpen(false);
  }

  async function handleDeleteTeam(id: string) {
    await deleteTeamMember(id);
    const updated = await fetchTeamFromCloud();
    setTeamMembers(updated);
    setDeleteTeamTarget(null);
    toast("Team member removed from cloud");
  }

  async function handleResetTeam() {
    if (confirm("Reset leadership team photos and info to original defaults?")) {
      await resetTeamMembers();
      const updated = await fetchTeamFromCloud();
      setTeamMembers(updated);
      toast("Leadership team reset to defaults");
    }
  }

  function deleteGalleryPhoto(urlToDelete: string) {
    setForm((f) => {
      const nextGallery = f.gallery.filter((u) => u !== urlToDelete);
      let nextCover = f.image;
      if (f.image === urlToDelete) {
        nextCover = nextGallery[0] || "";
        setImagePreview(nextCover);
      }
      return {
        ...f,
        gallery: nextGallery,
        image: nextCover,
      };
    });
    toast("Photo removed from gallery");
  }

  function addGalleryUrl() {
    const trimmed = newGalleryUrl.trim();
    if (!trimmed) return;
    if (form.gallery.includes(trimmed)) {
      toast("Photo already exists in gallery", "error");
      return;
    }
    setForm((f) => {
      const nextGallery = [...f.gallery, trimmed];
      const nextCover = f.image || trimmed;
      if (!f.image) setImagePreview(trimmed);
      return { ...f, gallery: nextGallery, image: nextCover };
    });
    setNewGalleryUrl("");
    toast("Photo added to gallery");
  }

  async function handleGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setGalleryUploading(true);
    const newUrls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const url = await uploadProjectImage(file);
          newUrls.push(url);
        } catch {
          // Fallback to data URL if network/storage is unavailable
          const reader = new FileReader();
          const dataUrl = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          newUrls.push(dataUrl);
        }
      }
      setForm((f) => {
        const updated = [...f.gallery, ...newUrls];
        const nextCover = f.image || updated[0] || "";
        if (!f.image && updated[0]) setImagePreview(updated[0]);
        return { ...f, gallery: updated, image: nextCover };
      });
      toast(`Added ${newUrls.length} photo${newUrls.length > 1 ? "s" : ""} to gallery`);
    } catch {
      toast("Failed to process gallery photos", "error");
    } finally {
      setGalleryUploading(false);
      if (galleryFileRef.current) galleryFileRef.current.value = "";
    }
  }

  async function handleSave() {
    if (!form.title || !form.code) { toast("Title and Code are required", "error"); return; }
    setSaving(true);
    try {
      let currentGallery = [...form.gallery];
      let primaryCover = form.image;

      // Upload new image if selected in main image area
      if (imageFile) {
        setUploadPct(10);
        try {
          primaryCover = await uploadProjectImage(imageFile, (pct) => setUploadPct(pct));
        } catch {
          const reader = new FileReader();
          primaryCover = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(imageFile);
          });
        }
        if (!currentGallery.includes(primaryCover)) {
          currentGallery.unshift(primaryCover);
        }
      }

      // Ensure gallery and cover are consistent
      if (primaryCover && !currentGallery.includes(primaryCover)) {
        currentGallery.unshift(primaryCover);
      }
      if (!primaryCover && currentGallery.length > 0) {
        primaryCover = currentGallery[0];
      }

      const payload: ProjectInput = {
        code: form.code,
        title: form.title,
        sector: form.sector,
        filter: form.filter,
        client: form.client || "",
        location: form.location || "",
        area: form.area || "",
        tonnage: form.tonnage || "",
        timeline: form.timeline || "",
        year: form.year || "",
        description: form.description || "",
        highlights: form.highlights || [],
        image: primaryCover || "",
        gallery: currentGallery,
        status: form.status,
        is_default: false,
      };

      if (editingId) {
        await updateProject(editingId, payload);
        toast("Project & photo gallery saved successfully");
      } else {
        await addProject(payload);
        toast("Project created successfully");
      }

      setDrawerOpen(false);
      await loadProjects();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
      setUploadPct(0);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);
      toast("Project deleted");
      setDeleteTarget(null);
      await loadProjects();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    }
  }

  async function handleSeed() {
    setSeeding(true);
    try {
      const msg = await seedDefaultProjects();
      toast(msg);
      await loadProjects();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Seed failed", "error");
    } finally {
      setSeeding(false);
    }
  }

  function handleLogout() {
    logoutAdmin();
    navigate("/admin", { replace: true });
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    background: "hsl(215 35% 14%)",
    border: "1px solid hsl(215 35% 22%)",
    color: "#fff", fontSize: 14,
    fontFamily: '"Space Grotesk", sans-serif',
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11.5, fontWeight: 700,
    color: "hsl(215 25% 55%)", marginBottom: 6,
    letterSpacing: "0.06em", textTransform: "uppercase",
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(215 40% 7%)", fontFamily: '"Space Grotesk", sans-serif' }}>
      {/* Header */}
      <header style={{ background: "hsl(215 35% 10%)", borderBottom: "1px solid hsl(215 35% 16%)", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 64, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "hsl(215 25% 55%)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={15} /> Back to site
          </button>
          <span style={{ color: "hsl(215 35% 28%)" }}>|</span>
          
          {/* Admin Navigation Tabs */}
          <div style={{ display: "flex", background: "hsl(215 35% 14%)", padding: 3, borderRadius: 8, border: "1px solid hsl(215 35% 20%)", gap: 4 }}>
            <button
              onClick={() => setActiveTab("projects")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 6,
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
                background: activeTab === "projects" ? "hsl(28 95% 52%)" : "transparent",
                color: activeTab === "projects" ? "#fff" : "hsl(215 20% 70%)",
                transition: "all 0.2s",
              }}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("team")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 6,
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
                background: activeTab === "team" ? "hsl(28 95% 52%)" : "transparent",
                color: activeTab === "team" ? "#fff" : "hsl(215 20% 70%)",
                transition: "all 0.2s",
              }}
            >
              <Users size={14} /> Leadership Team ({teamMembers.length})
            </button>
          </div>
        </div>

        {/* Action Buttons — Visible from both tabs */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              setActiveTab("projects");
              openAdd();
            }}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 8,
              background: activeTab === "projects" ? "hsl(28 95% 52%)" : "hsl(215 35% 16%)",
              border: activeTab === "projects" ? "none" : "1px solid hsl(215 35% 24%)",
              color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add Project
          </button>

          <button
            onClick={() => {
              setActiveTab("team");
              openAddTeam();
            }}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 8,
              background: activeTab === "team" ? "hsl(28 95% 52%)" : "hsl(215 35% 16%)",
              border: activeTab === "team" ? "none" : "1px solid hsl(215 35% 24%)",
              color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add Team Member
          </button>

          {activeTab === "projects" ? (
            <button
              onClick={handleSeed}
              disabled={seeding}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "hsl(215 35% 14%)", border: "1px solid hsl(215 35% 22%)", color: "hsl(215 20% 70%)", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
            >
              {seeding ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              Seed Defaults
            </button>
          ) : (
            <button
              onClick={handleResetTeam}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "hsl(215 35% 14%)", border: "1px solid hsl(215 35% 22%)", color: "hsl(215 20% 70%)", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
            >
              <RotateCcw size={13} /> Reset Defaults
            </button>
          )}

          <button onClick={handleLogout} title="Logout" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, background: "hsl(215 35% 14%)", border: "1px solid hsl(215 35% 22%)", color: "hsl(215 20% 60%)", fontSize: 13, cursor: "pointer" }}>
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: 1100, margin: "32px auto", padding: "0 24px" }}>
        {activeTab === "team" ? (
          /* ─── LEADERSHIP TEAM MANAGEMENT ────────────────────────── */
          <div>
            <div style={{ marginBottom: 28, background: "hsl(215 35% 11%)", padding: "20px 24px", borderRadius: 12, border: "1px solid hsl(215 35% 18%)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: '"Sora", sans-serif', margin: "0 0 6px" }}>
                  Leadership Team Photos & Profiles
                </h2>
                <p style={{ fontSize: 13, color: "hsl(215 20% 60%)", margin: 0 }}>
                  Add or manage profiles for directors, senior structural engineers, and project leads. Updates take effect immediately across the Homepage and About Us page.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ padding: "4px 12px", borderRadius: 999, background: "hsl(160 84% 39% / 0.15)", border: "1px solid hsl(160 84% 39% / 0.3)", color: "hsl(160 84% 50%)", fontSize: 12, fontWeight: 700 }}>
                  {teamMembers.length} Profiles Active
                </span>
                <button
                  onClick={openAddTeam}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8, background: "hsl(28 95% 52%)", border: "none", color: "#fff", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
                >
                  <Plus size={14} /> Add Member
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  style={{
                    background: "hsl(215 35% 11%)",
                    border: "1px solid hsl(215 35% 18%)",
                    borderRadius: 16,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Photo with edit overlay */}
                  <div style={{ position: "relative", height: 260, background: "hsl(215 40% 6%)", overflow: "hidden" }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          member.id === "upender"
                            ? "/assets/team/upender-reddy.jpg"
                            : member.id === "gangadhar"
                            ? "/assets/team/gangadhar.jpg"
                            : "/assets/brand/logo.png";
                      }}
                    />
                    <div style={{ position: "absolute", top: 14, right: 14, background: "hsl(215 40% 8% / 0.8)", backdropFilter: "blur(6px)", border: "1px solid hsl(0 0% 100% / 0.15)", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#fff" }}>
                      {member.experience}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: '"Sora", sans-serif', margin: "0 0 4px" }}>
                        {member.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(28 95% 58%)", textTransform: "uppercase" }}>
                          {member.role}
                        </span>
                        {member.qualification && (
                          <span style={{ fontSize: 11, color: "hsl(215 20% 65%)", background: "hsl(215 35% 16%)", padding: "1px 8px", borderRadius: 4 }}>
                            {member.qualification}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 12.5, color: "hsl(215 20% 60%)", margin: 0 }}>
                        Email: <span style={{ color: "#fff" }}>{member.email}</span>
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => openEditTeam(member)}
                        style={{
                          flex: 1,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                          padding: "11px 16px", borderRadius: 10,
                          background: "hsl(28 95% 52%)", border: "none", color: "#fff",
                          fontSize: 13, fontWeight: 700, cursor: "pointer",
                        }}
                      >
                        <Camera size={15} /> Edit Photo & Details
                      </button>
                      <button
                        onClick={() => setDeleteTeamTarget(member.id)}
                        title="Remove Team Member"
                        style={{
                          padding: "11px 14px", borderRadius: 10,
                          background: "hsl(0 80% 60% / 0.1)", border: "1px solid hsl(0 80% 60% / 0.25)",
                          color: "hsl(0 80% 65%)", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Team Member Quick Card */}
              <div
                onClick={openAddTeam}
                style={{
                  background: "hsl(215 35% 10% / 0.6)",
                  border: "2px dashed hsl(215 35% 24%)",
                  borderRadius: 16,
                  minHeight: 380,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  padding: 24,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(28 95% 52%)";
                  e.currentTarget.style.background = "hsl(215 35% 12%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(215 35% 24%)";
                  e.currentTarget.style.background = "hsl(215 35% 10% / 0.6)";
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "hsl(28 95% 52% / 0.15)", border: "1px solid hsl(28 95% 52% / 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Plus size={26} color="hsl(28 95% 58%)" />
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Add New Team Member</h4>
                <p style={{ fontSize: 12.5, color: "hsl(215 20% 55%)", margin: 0, maxWidth: 220 }}>
                  Add a director, structural engineer, or manager to the leadership section.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ─── PROJECTS TABLE ────────────────────────────────────── */
          loading ? (
            <div style={{ textAlign: "center", padding: 80, color: "hsl(215 25% 40%)" }}>
              <Loader2 size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
              <p>Loading projects from cloud...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80, borderRadius: 16, border: "1px dashed hsl(215 35% 20%)" }}>
              <p style={{ color: "hsl(215 25% 45%)", marginBottom: 20 }}>No projects yet. Click "Seed Defaults" to load the 5 built-in projects, or add your own.</p>
              <button onClick={handleSeed} style={{ padding: "10px 24px", borderRadius: 9, background: "hsl(28 95% 52%)", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Seed Default Projects
              </button>
            </div>
          ) : (
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid hsl(215 35% 16%)" }}>
              {/* Table head */}
              <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 140px 100px 90px 100px", padding: "11px 20px", background: "hsl(215 35% 12%)", borderBottom: "1px solid hsl(215 35% 18%)", fontSize: 11, fontWeight: 700, color: "hsl(215 25% 45%)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                <span>Image</span>
                <span>Title / Code</span>
                <span>Sector</span>
                <span>Location</span>
                <span>Area</span>
                <span>Status</span>
                <span style={{ textAlign: "right" }}>Actions</span>
              </div>

              {projects.map((p) => (
                <div
                  key={p.id}
                  style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 140px 100px 90px 100px", padding: "14px 20px", borderBottom: "1px solid hsl(215 35% 13%)", alignItems: "center", gap: 8, background: "hsl(215 40% 8%)", transition: "background 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(215 40% 10%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(215 40% 8%)")}
                >
                  {/* Thumb */}
                  <div style={{ width: 44, height: 36, borderRadius: 7, overflow: "hidden", background: "hsl(215 35% 14%)", flexShrink: 0 }}>
                    {p.image && <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>

                  {/* Title */}
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{p.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontSize: 11, color: "hsl(28 95% 58%)", fontWeight: 700 }}>{p.code}</span>
                      {p.is_default && (
                        <span style={{ fontSize: 9.5, fontWeight: 700, padding: "1px 7px", borderRadius: 4, background: "hsl(215 72% 18% / 0.6)", border: "1px solid hsl(215 50% 35%)", color: "hsl(215 60% 65%)" }}>DEFAULT</span>
                      )}
                    </div>
                  </div>

                  <span style={{ fontSize: 13, color: "hsl(215 20% 60%)" }}>{p.sector}</span>
                  <span style={{ fontSize: 12.5, color: "hsl(215 20% 55%)" }}>{p.location || "—"}</span>
                  <span style={{ fontSize: 12.5, color: "hsl(215 20% 55%)" }}>{p.area || "—"}</span>

                  {/* Status badge */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: p.status === "active" ? "hsl(160 84% 39% / 0.1)" : "hsl(215 35% 16%)", color: p.status === "active" ? "hsl(160 84% 50%)" : "hsl(215 25% 45%)", border: `1px solid ${p.status === "active" ? "hsl(160 84% 39% / 0.3)" : "hsl(215 35% 22%)"}` }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                    {p.status}
                  </span>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button
                      onClick={() => openEdit(p)}
                      title="Edit"
                      style={{ padding: "6px 10px", borderRadius: 7, background: "hsl(215 35% 16%)", border: "1px solid hsl(215 35% 22%)", color: "hsl(215 20% 65%)", cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p.id)}
                      title="Delete"
                      style={{ padding: "6px 10px", borderRadius: 7, background: "hsl(0 80% 60% / 0.08)", border: "1px solid hsl(0 80% 60% / 0.2)", color: "hsl(0 80% 65%)", cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* ─── DRAWER ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              style={{ position: "fixed", inset: 0, background: "hsl(215 40% 5% / 0.7)", zIndex: 40, backdropFilter: "blur(4px)" }}
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(520px, 98vw)", background: "hsl(215 35% 10%)", borderLeft: "1px solid hsl(215 35% 18%)", zIndex: 50, overflowY: "auto", display: "flex", flexDirection: "column" }}
            >
              {/* Drawer header */}
              <div style={{ padding: "22px 28px", borderBottom: "1px solid hsl(215 35% 16%)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "hsl(215 35% 10%)", zIndex: 1 }}>
                <h2 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: "1.1rem", color: "#fff", margin: 0 }}>
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", color: "hsl(215 25% 50%)", cursor: "pointer", display: "flex" }}>
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>

                {/* Image upload */}
                <div>
                  <label style={labelStyle}>Primary Cover Image</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{ width: "100%", height: 160, borderRadius: 10, border: "2px dashed hsl(215 35% 24%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", position: "relative", background: imagePreview ? "transparent" : "hsl(215 35% 13%)", transition: "border-color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "hsl(28 95% 52%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(215 35% 24%)")}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "hsl(215 40% 7% / 0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                        >
                          <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Change Cover Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={28} color="hsl(215 25% 45%)" />
                        <p style={{ fontSize: 13, color: "hsl(215 25% 45%)", marginTop: 10 }}>Click to upload cover image</p>
                        <p style={{ fontSize: 11, color: "hsl(215 25% 35%)", marginTop: 4 }}>JPG, PNG, WEBP — max 5 MB</p>
                      </>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />

                  {/* OR paste URL */}
                  <p style={{ fontSize: 11, color: "hsl(215 25% 40%)", marginTop: 8 }}>— or paste cover image URL / path —</p>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg or /assets/projects/..."
                    value={form.image}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, image: e.target.value }));
                      if (e.target.value) { setImagePreview(e.target.value); setImageFile(null); }
                    }}
                    style={{ ...fieldStyle, marginTop: 6 }}
                  />

                  {/* Upload progress */}
                  {uploadPct > 0 && uploadPct < 100 && (
                    <div style={{ marginTop: 8, height: 4, borderRadius: 999, background: "hsl(215 35% 18%)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${uploadPct}%`, background: "linear-gradient(90deg, hsl(215 72% 45%), hsl(28 95% 52%))", borderRadius: 999, transition: "width 0.3s" }} />
                    </div>
                  )}
                </div>

                {/* ─── MULTI-PHOTO GALLERY MANAGER ──────────────────────── */}
                <div style={{ padding: "18px 20px", borderRadius: 12, background: "hsl(215 35% 12%)", border: "1px solid hsl(215 35% 20%)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: 2 }}>Project Gallery Photos</label>
                      <p style={{ fontSize: 12, color: "hsl(215 25% 65%)" }}>
                        {form.gallery.length} photo{form.gallery.length !== 1 ? "s" : ""} in gallery &bull; Select which to keep, delete, or set as primary cover
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => galleryFileRef.current?.click()}
                      disabled={galleryUploading}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "7px 14px",
                        borderRadius: 8,
                        background: "hsl(28 95% 52% / 0.15)",
                        border: "1px solid hsl(28 95% 52% / 0.4)",
                        color: "hsl(28 95% 62%)",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: galleryUploading ? "not-allowed" : "pointer",
                      }}
                    >
                      <Plus size={14} /> {galleryUploading ? "Processing..." : "Add Photos"}
                    </button>
                    <input
                      ref={galleryFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryFiles}
                      style={{ display: "none" }}
                    />
                  </div>

                  {/* Photo Grid */}
                  {form.gallery.length === 0 ? (
                    <div style={{ padding: "20px 14px", textAlign: "center", borderRadius: 8, background: "hsl(215 35% 14%)", border: "1px dashed hsl(215 35% 24%)", color: "hsl(215 25% 50%)", fontSize: 12.5 }}>
                      No photos in this gallery yet. Upload photos or paste URLs below.
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 14 }}>
                      {form.gallery.map((photoUrl, idx) => {
                        const isCover = (form.image === photoUrl) || (!form.image && idx === 0);
                        return (
                          <div
                            key={`${photoUrl}-${idx}`}
                            style={{
                              position: "relative",
                              borderRadius: 8,
                              overflow: "hidden",
                              border: isCover ? "2px solid hsl(28 95% 52%)" : "1px solid hsl(215 35% 24%)",
                              background: "hsl(215 35% 15%)",
                              boxShadow: isCover ? "0 0 12px hsl(28 95% 52% / 0.3)" : "none",
                            }}
                          >
                            <div style={{ width: "100%", height: 95, overflow: "hidden", position: "relative" }}>
                              <img
                                src={photoUrl}
                                alt={`Photo ${idx + 1}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                              {isCover && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: 4,
                                    left: 4,
                                    background: "hsl(28 95% 52%)",
                                    color: "#fff",
                                    fontSize: 9.5,
                                    fontWeight: 800,
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Cover
                                </span>
                              )}
                              {/* Delete button on thumbnail */}
                              <button
                                type="button"
                                title="Delete this photo from project"
                                onClick={() => deleteGalleryPhoto(photoUrl)}
                                style={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  width: 26,
                                  height: 26,
                                  borderRadius: 6,
                                  background: "hsl(0 80% 50% / 0.85)",
                                  border: "none",
                                  color: "#fff",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(0 85% 55%)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(0 80% 50% / 0.85)")}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>

                            {/* Action bar below thumbnail */}
                            <div style={{ padding: "6px 8px", background: "hsl(215 35% 10%)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <span style={{ fontSize: 10, color: "hsl(215 25% 60%)", fontWeight: 600 }}>
                                #{idx + 1}
                              </span>
                              {!isCover ? (
                                <button
                                  type="button"
                                  onClick={() => setAsCover(photoUrl)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "hsl(28 95% 62%)",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    padding: "2px 4px",
                                  }}
                                >
                                  Make Cover
                                </button>
                              ) : (
                                <span style={{ fontSize: 10, fontWeight: 700, color: "hsl(28 95% 62%)" }}>
                                  &bull; Cover
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add by URL input */}
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <input
                      type="text"
                      placeholder="Add photo URL or path (e.g. /assets/projects/azad-05.jpg)"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addGalleryUrl();
                        }
                      }}
                      style={{ ...fieldStyle, flex: 1, padding: "8px 12px", fontSize: 12.5 }}
                    />
                    <button
                      type="button"
                      onClick={addGalleryUrl}
                      disabled={!newGalleryUrl.trim()}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        background: newGalleryUrl.trim() ? "hsl(215 35% 22%)" : "hsl(215 35% 16%)",
                        border: "1px solid hsl(215 35% 28%)",
                        color: newGalleryUrl.trim() ? "#fff" : "hsl(215 25% 45%)",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: newGalleryUrl.trim() ? "pointer" : "not-allowed",
                        whiteSpace: "nowrap",
                      }}
                    >
                      + Add Photo
                    </button>
                  </div>
                </div>

                {/* Two-column fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Project Title *</label>
                    <input style={fieldStyle} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Azad Engineering Aerospace" />
                  </div>
                  <div>
                    <label style={labelStyle}>Project Code *</label>
                    <input style={fieldStyle} value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} placeholder="e.g. AA / AERO-01" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Client / Enterprise</label>
                    <input style={fieldStyle} value={form.client} onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} placeholder="e.g. Azad Engineering Limited" />
                  </div>
                  <div>
                    <label style={labelStyle}>Sector</label>
                    <select style={fieldStyle} value={form.sector} onChange={(e) => onSectorChange(e.target.value)}>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <input style={fieldStyle} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Jeedimetla, Hyderabad" />
                  </div>
                  <div>
                    <label style={labelStyle}>Built-up Area</label>
                    <input style={fieldStyle} value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} placeholder="e.g. 65,000 Sq. Ft." />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Steel Tonnage</label>
                    <input style={fieldStyle} value={form.tonnage} onChange={(e) => setForm((f) => ({ ...f, tonnage: e.target.value }))} placeholder="e.g. 620 MT" />
                  </div>
                  <div>
                    <label style={labelStyle}>Execution Timeline</label>
                    <input style={fieldStyle} value={form.timeline} onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))} placeholder="e.g. 48 Days" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Year</label>
                    <input style={fieldStyle} value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="e.g. 2023" />
                  </div>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select style={fieldStyle} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "active" | "draft" }))}>
                      <option value="active">Active (visible on site)</option>
                      <option value="draft">Draft (hidden)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    style={{ ...fieldStyle, minHeight: 96, resize: "vertical" }}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Brief project description..."
                  />
                </div>
              </div>

              {/* Save button */}
              <div style={{ padding: "18px 28px", borderTop: "1px solid hsl(215 35% 16%)", background: "hsl(215 35% 10%)", position: "sticky", bottom: 0 }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{ width: "100%", padding: "13px", borderRadius: 10, background: saving ? "hsl(28 80% 40%)" : "hsl(28 95% 52%)", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                >
                  {saving ? (
                    <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> {uploadPct > 0 ? `Uploading ${uploadPct}%...` : "Saving..."}</>
                  ) : (
                    <><Check size={16} /> {editingId ? "Save Changes" : "Add Project"}</>
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── TEAM MEMBER EDIT DRAWER ─────────────────────────────── */}
      <AnimatePresence>
        {teamDrawerOpen && editingTeamMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTeamDrawerOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "hsl(215 40% 5% / 0.7)",
                zIndex: 40,
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(480px, 98vw)",
                background: "hsl(215 35% 10%)",
                borderLeft: "1px solid hsl(215 35% 18%)",
                zIndex: 50,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Drawer header */}
              <div
                style={{
                  padding: "22px 28px",
                  borderBottom: "1px solid hsl(215 35% 16%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "sticky",
                  top: 0,
                  background: "hsl(215 35% 10%)",
                  zIndex: 1,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: '"Sora", sans-serif',
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {isAddingNewTeam ? "Add New Team Member" : "Edit Leader Profile"}
                  </h2>
                  <p
                    style={{
                      fontSize: 12,
                      color: "hsl(28 95% 58%)",
                      margin: "3px 0 0",
                      fontWeight: 600,
                    }}
                  >
                    {isAddingNewTeam
                      ? "Enter details & upload photo for public website"
                      : editingTeamMember.name}
                  </p>
                </div>
                <button
                  onClick={() => setTeamDrawerOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "hsl(215 25% 50%)",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <div
                style={{
                  padding: "24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  flex: 1,
                }}
              >
                {/* Photo upload / preview */}
                <div>
                  <label style={labelStyle}>Profile Photo</label>
                  <div
                    onClick={() => teamFileRef.current?.click()}
                    style={{
                      width: "100%",
                      height: 240,
                      borderRadius: 12,
                      border: "2px dashed hsl(215 35% 24%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                      background: teamPhotoPreview ? "transparent" : "hsl(215 35% 13%)",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "hsl(28 95% 52%)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "hsl(215 35% 24%)")
                    }
                  >
                    {teamPhotoPreview ? (
                      <>
                        <img
                          src={teamPhotoPreview}
                          alt="preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "hsl(215 40% 7% / 0.55)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                        >
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 13,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <Camera size={16} /> Click to Upload New Photo
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={28} color="hsl(215 25% 45%)" />
                        <p style={{ fontSize: 13, color: "hsl(215 25% 45%)", marginTop: 10 }}>
                          Click to upload profile photo
                        </p>
                        <p style={{ fontSize: 11, color: "hsl(215 25% 35%)", marginTop: 4 }}>
                          JPG, PNG, WEBP
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={teamFileRef}
                    type="file"
                    accept="image/*"
                    onChange={onTeamFileChange}
                    style={{ display: "none" }}
                  />

                  {/* OR paste URL / path */}
                  <p style={{ fontSize: 11, color: "hsl(215 25% 40%)", marginTop: 8 }}>
                    — or paste photo URL / path —
                  </p>
                  <input
                    type="text"
                    placeholder="/assets/team/... or https://..."
                    value={editingTeamMember.photo}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingTeamMember((prev) => (prev ? { ...prev, photo: val } : null));
                      setTeamPhotoPreview(val);
                    }}
                    style={{ ...fieldStyle, marginTop: 6 }}
                  />
                </div>

                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    value={editingTeamMember.name}
                    onChange={(e) =>
                      setEditingTeamMember((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                    style={fieldStyle}
                  />
                </div>

                {/* Role / Designation */}
                <div>
                  <label style={labelStyle}>Role / Designation</label>
                  <input
                    type="text"
                    value={editingTeamMember.role}
                    onChange={(e) =>
                      setEditingTeamMember((prev) =>
                        prev ? { ...prev, role: e.target.value } : null
                      )
                    }
                    style={fieldStyle}
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label style={labelStyle}>Qualification (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. M.Tech. Structures"
                    value={editingTeamMember.qualification || ""}
                    onChange={(e) =>
                      setEditingTeamMember((prev) =>
                        prev ? { ...prev, qualification: e.target.value } : null
                      )
                    }
                    style={fieldStyle}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label style={labelStyle}>Experience Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 28+ Years or 10+ Years"
                    value={editingTeamMember.experience}
                    onChange={(e) =>
                      setEditingTeamMember((prev) =>
                        prev ? { ...prev, experience: e.target.value } : null
                      )
                    }
                    style={fieldStyle}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    value={editingTeamMember.email}
                    onChange={(e) =>
                      setEditingTeamMember((prev) =>
                        prev ? { ...prev, email: e.target.value } : null
                      )
                    }
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Drawer footer actions */}
              <div
                style={{
                  padding: "18px 28px",
                  borderTop: "1px solid hsl(215 35% 16%)",
                  display: "flex",
                  gap: 12,
                  position: "sticky",
                  bottom: 0,
                  background: "hsl(215 35% 10%)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setTeamDrawerOpen(false)}
                  style={{
                    flex: 1,
                    padding: "11px",
                    borderRadius: 8,
                    background: "hsl(215 35% 16%)",
                    border: "1px solid hsl(215 35% 24%)",
                    color: "hsl(215 20% 70%)",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveTeamMember}
                  style={{
                    flex: 2,
                    padding: "11px",
                    borderRadius: 8,
                    background: "hsl(28 95% 52%)",
                    border: "none",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                  }}
                >
                  {isAddingNewTeam ? (
                    <><Plus size={16} /> Add Team Member</>
                  ) : (
                    <><Check size={16} /> Save Profile & Photo</>
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── DELETE TEAM CONFIRM ─────────────────────────────────── */}
      <AnimatePresence>
        {deleteTeamTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "hsl(215 40% 5% / 0.8)",
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              style={{
                background: "hsl(215 35% 12%)",
                border: "1px solid hsl(215 35% 20%)",
                borderRadius: 14,
                padding: 32,
                maxWidth: 360,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "hsl(0 80% 60% / 0.1)",
                  border: "1px solid hsl(0 80% 60% / 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Trash2 size={20} color="hsl(0 80% 65%)" />
              </div>
              <h3
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#fff",
                  marginBottom: 10,
                }}
              >
                Remove Team Member?
              </h3>
              <p style={{ fontSize: 13.5, color: "hsl(215 20% 55%)", marginBottom: 24 }}>
                This will remove the profile and photo from the public website.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setDeleteTeamTarget(null)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 8,
                    background: "hsl(215 35% 16%)",
                    border: "1px solid hsl(215 35% 24%)",
                    color: "hsl(215 20% 70%)",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTeam(deleteTeamTarget)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 8,
                    background: "hsl(0 80% 52%)",
                    border: "none",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DELETE CONFIRM ──────────────────────────────────────── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "hsl(215 40% 5% / 0.8)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              style={{ background: "hsl(215 35% 12%)", border: "1px solid hsl(215 35% 20%)", borderRadius: 14, padding: 32, maxWidth: 360, textAlign: "center" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "hsl(0 80% 60% / 0.1)", border: "1px solid hsl(0 80% 60% / 0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Trash2 size={20} color="hsl(0 80% 65%)" />
              </div>
              <h3 style={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 10 }}>Delete Project?</h3>
              <p style={{ fontSize: 13.5, color: "hsl(215 20% 55%)", marginBottom: 24 }}>This will permanently remove it from the cloud database and the website.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "hsl(215 35% 16%)", border: "1px solid hsl(215 35% 24%)", color: "hsl(215 20% 70%)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteTarget)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "hsl(0 80% 52%)", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── TOASTS ──────────────────────────────────────────────── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100, display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
              style={{ padding: "12px 18px", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "#fff", background: t.type === "success" ? "hsl(160 70% 25%)" : "hsl(0 70% 32%)", border: `1px solid ${t.type === "success" ? "hsl(160 70% 35%)" : "hsl(0 70% 40%)"}`, boxShadow: "0 4px 20px hsl(215 40% 5% / 0.5)", minWidth: 220 }}
            >
              {t.type === "success" ? <Check size={15} /> : <X size={15} />}
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
