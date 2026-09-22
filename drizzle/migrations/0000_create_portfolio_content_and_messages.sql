CREATE TABLE public.portfolio_content (
  id TEXT PRIMARY KEY DEFAULT 'main' CHECK (id = 'main'),
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.portfolio_content TO authenticated;
GRANT ALL ON public.portfolio_content TO service_role;
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portfolio content is publicly readable" ON public.portfolio_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated owner can insert content" ON public.portfolio_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated owner can update content" ON public.portfolio_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated owner can delete content" ON public.portfolio_content FOR DELETE TO authenticated USING (true);

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_read BOOLEAN NOT NULL DEFAULT false
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can send contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated owner can read messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated owner can update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated owner can delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (true);

CREATE INDEX contact_messages_created_at_idx ON public.contact_messages (created_at DESC);