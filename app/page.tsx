import { Header } from "@/components/header";
import { AnnouncementBar, Hero, BrandStatement, EditorialSplit, OnyxExperience } from "@/components/home-sections";
import { ProductCarousel } from "@/components/product-carousel";
import { BrandFooter } from "@/components/footer";

export default function HomePage() {
  return <><AnnouncementBar /><Header /><main id="main-content"><Hero /><BrandStatement /><EditorialSplit /><ProductCarousel /><OnyxExperience /></main><BrandFooter /></>;
}
