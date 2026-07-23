import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareBar } from "@/components/property/CompareBar";
import { getAllProperties } from "@/db/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const properties = await getAllProperties();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CompareBar properties={properties} />
    </>
  );
}
