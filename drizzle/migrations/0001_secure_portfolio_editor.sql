CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

CREATE POLICY "Admins can read their role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY "Authenticated owner can insert content" ON public.portfolio_content;
DROP POLICY "Authenticated owner can update content" ON public.portfolio_content;
DROP POLICY "Authenticated owner can delete content" ON public.portfolio_content;
CREATE POLICY "Admins can insert content" ON public.portfolio_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content" ON public.portfolio_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete content" ON public.portfolio_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated owner can read messages" ON public.contact_messages;
DROP POLICY "Authenticated owner can update messages" ON public.contact_messages;
DROP POLICY "Authenticated owner can delete messages" ON public.contact_messages;
CREATE POLICY "Admins can read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view portfolio files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload portfolio files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));