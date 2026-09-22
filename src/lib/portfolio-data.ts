import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type PortfolioContent } from "./portfolio";

export async function getPortfolio(): Promise<PortfolioContent> {
  const { data } = await supabase.from("portfolio_content").select("content").eq("id", "main").maybeSingle();
  if (!data?.content) return defaultContent;
  const saved = data.content as Partial<PortfolioContent>;
  return {
    ...defaultContent,
    ...saved,
    about: saved.about ?? defaultContent.about,
    work: saved.work ?? defaultContent.work,
    certificates: saved.certificates ?? defaultContent.certificates,
    services: saved.services ?? defaultContent.services,
    tools: saved.tools ?? defaultContent.tools,
    workItems: saved.workItems ?? defaultContent.workItems,
  };
}

export async function assetUrl(path?: string) {
  if (!path) return "";
  const { data } = await supabase.storage.from("portfolio-assets").createSignedUrl(path, 3600);
  return data?.signedUrl ?? "";
}
