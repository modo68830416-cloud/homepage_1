import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties } from "@/lib/properties/mock-data";
import { Breadcrumb } from "@/components/property/Breadcrumb";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertySummary } from "@/components/property/PropertySummary";
import { PriceCard } from "@/components/property/PriceCard";
import { PropertyDescription } from "@/components/property/PropertyDescription";
import { OptionList } from "@/components/property/OptionList";
import { MapSection } from "@/components/property/MapSection";
import { NearbySection } from "@/components/property/NearbySection";
import { InquiryCard } from "@/components/property/InquiryCard";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { ShareButtons } from "@/components/property/ShareButtons";
import { RecommendationSection } from "@/components/property/RecommendationSection";
import { MobileStickyBar } from "@/components/property/MobileStickyBar";
import { RecordView } from "@/components/property/RecordView";

function getProperty(id: string) {
  return properties.find((item) => item.id === id);
}

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) return { title: "매물을 찾을 수 없습니다" };

  const description = `${property.city} ${property.district} · ${property.dealType} ${property.price} · ${property.areaM2}㎡`;
  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      type: "website",
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getProperty(id);

  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description.features.join(" "),
    url: `https://example.com/property/${property.id}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.district,
      addressRegion: property.city,
      addressCountry: "KR",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.areaM2,
      unitCode: "MTK",
    },
  };

  return (
    <div className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecordView propertyId={property.id} />

      <div className="mx-auto max-w-[1200px] px-6 pt-6">
        <Breadcrumb
          items={[
            { label: "홈", href: "/" },
            { label: "매물검색", href: "/search" },
            { label: property.propertyType, href: `/search?propertyType=${property.propertyType}` },
            { label: property.district },
          ]}
        />
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <PropertyGallery images={property.images} title={property.title} />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <PropertySummary property={property} />
          </div>

          <div className="flex flex-wrap gap-2">
            <FavoriteButton propertyId={property.id} />
            <ShareButtons title={property.title} />
          </div>

          <div className="lg:hidden">
            <PriceCard property={property} />
          </div>

          <PropertyDescription description={property.description} />
          <OptionList options={property.options} />
          <MapSection address={property.address} />
          <NearbySection nearby={property.nearby} />
          <RecommendationSection current={property} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <PriceCard property={property} />
            <InquiryCard propertyTitle={property.title} />
          </div>
        </aside>
      </div>

      <MobileStickyBar />
    </div>
  );
}
