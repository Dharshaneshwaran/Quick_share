import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./site.css";
import "./responsive.css";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import SiteEffects from "@/components/SiteEffects";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Deetya Marga Foundation",
    template: "%s | Deetya Marga Foundation",
  },
  description:
    "Medicine, education and free clinic care for families who need it most. Together we can do so much.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
        <BackToTop />
        <CustomCursor />
        <SiteEffects />
      </body>
    </html>
  );
}
