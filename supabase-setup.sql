-- ══════════════════════════════════════════════════════════════
--  AA Spaces — Supabase Database Setup
--  Run this in: supabase.com → Your Project → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code        text NOT NULL,
  title       text NOT NULL,
  sector      text NOT NULL DEFAULT 'Warehouse',
  filter      text NOT NULL DEFAULT 'warehouse',
  location    text,
  area        text,
  description text,
  image       text,           -- public URL (Supabase Storage or external)
  status      text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  is_default  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to READ active projects (public website)
CREATE POLICY "Public read active projects"
  ON public.projects FOR SELECT
  USING (status = 'active');

-- 4. Allow anyone to READ all projects (admin panel)
--    In production, restrict this to authenticated users.
CREATE POLICY "Allow all reads"
  ON public.projects FOR SELECT
  USING (true);

-- 5. Allow all writes (INSERT/UPDATE/DELETE) — open for now
--    Since your admin is PIN-protected client-side, this is OK for a start.
--    To lock it down later: add Supabase Auth and change this to
--    USING (auth.role() = 'authenticated')
CREATE POLICY "Allow all writes"
  ON public.projects FOR ALL
  USING (true)
  WITH CHECK (true);

-- ══════════════════════════════════════════════════════════════
--  Storage bucket setup — run AFTER creating the table above
-- ══════════════════════════════════════════════════════════════
-- Go to: Storage → New Bucket
--   Name: project-images
--   Public bucket: YES (checked)
--   File size limit: 5242880 (5 MB)
--   Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

-- Then run this to allow public uploads:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: allow anyone to upload
CREATE POLICY "Allow public uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

-- Storage policy: allow public reads
CREATE POLICY "Allow public reads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- ══════════════════════════════════════════════════════════════
-- Done! Now go back to your app and click "Seed Defaults"
-- in the admin panel to populate the 5 default projects.
-- ══════════════════════════════════════════════════════════════
