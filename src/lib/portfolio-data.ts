import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type PortfolioContent } from "./portfolio";

export async function getPortfolio(): Promise<PortfolioContent> {
  const { data } = await supabase.from("portfolio_content").select("content").eq("id", "main").maybeSingle();
  return data?.content ? { ...defaultContent, ...(data.content as unknown as PortfolioContent) } : defaultContent;
}

export async function assetUrl(path?: string) {
  if (!path) return "";
  const { data } = await supabase.storage.from("portfolio-assets").createSignedUrl(path, 3600);
  return data?.signedUrl ?? "";
}
