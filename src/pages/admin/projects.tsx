import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft, Check, Edit2, ImagePlus, Loader2,
  LogOut, Plus, Trash2, Upload, X
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
  code: "", title: "", sector: "Warehouse", filter: "warehouse",
  location: "", area: "", description: "", image: "", status: "active",
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
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkAdminAuth()) { navigate("/admin", { replace: true }); return; }
    loadProjects();
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
    setDrawerOpen(true);
  }

  function openEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      code: p.code, title: p.title, sector: p.sector, filter: p.filter,
      location: p.location, area: p.area, description: p.description,
      image: p.image, status: p.status,
    });
    setImageFile(null);
    setImagePreview(p.image || "");
    setUploadPct(0);
    setDrawerOpen(true);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((f) => ({ ...f, image: "" }));
  }

  function onSectorChange(sector: string) {
    setForm((f) => ({ ...f, sector, filter: FILTER_MAP[sector] ?? sector.toLowerCase() }));
  }

  async function handleSave() {
    if (!form.title || !form.code) { toast("Title and Code are required", "error"); return; }
    setSaving(true);
    try {
      let imageUrl = form.image;

      // Upload new image if selected
      if (imageFile) {
        setUploadPct(5);
        imageUrl = await uploadProjectImage(imageFile, (pct) => setUploadPct(pct));
      }

      const payload: ProjectInput = {
        ...form,
        image: imageUrl,
        is_default: false,
      };

      if (editingId) {
        await updateProject(editingId, payload);
        toast("Project updated successfully");
      } else {
        await addProject(payload);
        toast("Project added successfully");
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
      <header style={{ background: "hsl(215 35% 10%)", borderBottom: "1px solid hsl(215 35% 16%)", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "hsl(215 25% 55%)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={15} /> Back to site
          </button>
          <span style={{ color: "hsl(215 35% 28%)" }}>|</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: '"Sora", sans-serif' }}>Project Manager</span>
          <span style={{ padding: "3px 10px", borderRadius: 6, background: "hsl(28 95% 52% / 0.12)", border: "1px solid hsl(28 95% 52% / 0.3)", fontSize: 11, fontWeight: 700, color: "hsl(28 95% 62%)" }}>
            {projects.length} projects
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleSeed}
            disabled={seeding}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "hsl(215 35% 16%)", border: "1px solid hsl(215 35% 24%)", color: "hsl(215 20% 70%)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Seed Defaults
          </button>
          <button
            onClick={openAdd}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, background: "hsl(28 95% 52%)", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            <Plus size={15} /> Add Project
          </button>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "hsl(215 35% 16%)", border: "1px solid hsl(215 35% 24%)", color: "hsl(215 20% 60%)", fontSize: 13, cursor: "pointer" }}>
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Table */}
      <div style={{ maxWidth: 1100, margin: "32px auto", padding: "0 24px" }}>
        {loading ? (
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
                  <label style={labelStyle}>Project Image</label>
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
                          <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Change image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={28} color="hsl(215 25% 45%)" />
                        <p style={{ fontSize: 13, color: "hsl(215 25% 45%)", marginTop: 10 }}>Click to upload image</p>
                        <p style={{ fontSize: 11, color: "hsl(215 25% 35%)", marginTop: 4 }}>JPG, PNG, WEBP — max 5 MB</p>
                      </>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />

                  {/* OR paste URL */}
                  <p style={{ fontSize: 11, color: "hsl(215 25% 40%)", marginTop: 8 }}>— or paste an image URL below —</p>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={form.image}
                    onChange={(e) => { setForm((f) => ({ ...f, image: e.target.value })); if (e.target.value) { setImagePreview(e.target.value); setImageFile(null); } }}
                    style={{ ...fieldStyle, marginTop: 6 }}
                  />

                  {/* Upload progress */}
                  {uploadPct > 0 && uploadPct < 100 && (
                    <div style={{ marginTop: 8, height: 4, borderRadius: 999, background: "hsl(215 35% 18%)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${uploadPct}%`, background: "linear-gradient(90deg, hsl(215 72% 45%), hsl(28 95% 52%))", borderRadius: 999, transition: "width 0.3s" }} />
                    </div>
                  )}
                </div>

                {/* Two-column fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Project Title *</label>
                    <input style={fieldStyle} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Industrial Warehouse" />
                  </div>
                  <div>
                    <label style={labelStyle}>Project Code *</label>
                    <input style={fieldStyle} value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} placeholder="e.g. WH-007" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Sector</label>
                    <select style={fieldStyle} value={form.sector} onChange={(e) => onSectorChange(e.target.value)}>
                      {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select style={fieldStyle} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "active" | "draft" }))}>
                      <option value="active">Active (visible on site)</option>
                      <option value="draft">Draft (hidden)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <input style={fieldStyle} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Hyderabad, Telangana" />
                  </div>
                  <div>
                    <label style={labelStyle}>Area</label>
                    <input style={fieldStyle} value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} placeholder="e.g. 18,000 sq ft" />
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
