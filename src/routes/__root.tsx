import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() { return <main className="grid min-h-screen place-items-center px-6 text-center"><div><p className="font-display text-8xl">404</p><h1 className="text-xl font-semibold">Page not found</h1><Link to="/" className="mt-6 inline-block text-sm underline">Return home</Link></div></main>; }
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) { const router = useRouter(); useEffect(() => reportLovableError(error, { boundary: "root" }), [error]); return <main className="grid min-h-screen place-items-center px-6 text-center"><div><h1 className="font-display text-4xl">This page didn’t load</h1><button className="mt-6 underline" onClick={() => { router.invalidate(); reset(); }}>Try again</button></div></main>; }
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" }] }),
  shellComponent: ({ children }: { children: ReactNode }) => <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>,
  component: () => { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /><Toaster /></QueryClientProvider>; },
  notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
