-- 1. Public portfolio read limited to the single published row
DROP POLICY IF EXISTS "Portfolio content is publicly readable" ON public.portfolio_content;
CREATE POLICY "Published portfolio content is readable"
ON public.portfolio_content
FOR SELECT
TO anon, authenticated
USING (id = 'main');

-- 2. Contact form inserts must contain valid, bounded values
DROP POLICY IF EXISTS "Visitors can send contact messages" ON public.contact_messages;
CREATE POLICY "Visitors can send valid contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  is_read = false
  AND length(btrim(name)) BETWEEN 1 AND 100
  AND length(email) BETWEEN 5 AND 255
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 2000
);

-- 3. Public file reads limited to published portfolio asset objects
DROP POLICY IF EXISTS "Portfolio files are publicly readable" ON storage.objects;
CREATE POLICY "Published portfolio files are readable"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'portfolio-assets'
  AND name !~ '/'
  AND name ~ '^(heroPhoto|aboutPhoto|resume|work-[0-9]+|certificate-[0-9]+)-'
);
