import { notFound } from "next/navigation";
import ServicePageLayout from "@/app/components/ServicePageLayout";
import { SEGMENT_IDS, getSegmentById } from "@/lib/ecosystem";

type PageProps = {
  params: Promise<{ segment: string }>;
};

export function generateStaticParams() {
  return SEGMENT_IDS.map((segment) => ({ segment }));
}

export async function generateMetadata({ params }: PageProps) {
  const { segment: id } = await params;
  const segment = getSegmentById(id);
  if (!segment) return { title: "پیشران" };
  return {
    title: `${segment.label} | پیشران`,
    description: segment.description,
  };
}

export default async function SegmentPage({ params }: PageProps) {
  const { segment: id } = await params;
  const segment = getSegmentById(id);
  if (!segment) notFound();

  return (
    <ServicePageLayout
      title={segment.label}
      description={segment.description}
      paragraphs={segment.paragraphs}
      segment={segment}
      breadcrumb={[{ label: segment.label, href: `/services/${segment.id}` }]}
    />
  );
}
