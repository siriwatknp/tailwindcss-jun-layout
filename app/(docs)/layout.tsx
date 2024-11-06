import { MobileNav } from "@/components/mobile-nav";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="jun-layout">
      <SiteBanner />
      <SiteHeader />
      <div className="jun-edgeSidebar jun-edgeSidebar-drawer md:jun-edgeSidebar-permanent md:jun-edgeSidebar-permanent-hidden">
        <div className="jun-edgeContent">
          <MobileNav />
        </div>
      </div>
      <main className="flex-1 jun-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
