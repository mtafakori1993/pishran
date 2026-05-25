import { notFound } from "next/navigation";
import ServicePageLayout from "@/app/components/ServicePageLayout";
import {
  childHref,
  childPageDescription,
  getAllChildParams,
  getChildById,
  getSegmentById,
  segmentHref,
} from "@/lib/ecosystem";

type PageProps = {
  params: Promise<{ segment: string; child: string }>;
};

export function generateStaticParams() {
  return getAllChildParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { segment: segmentId, child: childId } = await params;
  const segment = getSegmentById(segmentId);
  const child = getChildById(segmentId, childId);
  if (!segment || !child) return { title: "پیشران" };
  return {
    title: `${child.label} | ${segment.label} | پیشران`,
    description: childPageDescription(segment.label, child),
  };
}

export default async function ChildPage({ params }: PageProps) {
  const { segment: segmentId, child: childId } = await params;
  const segment = getSegmentById(segmentId);
  const child = getChildById(segmentId, childId);
  if (!segment || !child) notFound();

  return (
    <ServicePageLayout
      title={child.label}
      description={childPageDescription(segment.label, child)}
      paragraphs={child.paragraphs}
      segment={segment}
      child={child}
      breadcrumb={[
        { label: segment.label, href: segmentHref(segment.id) },
        { label: child.label, href: childHref(segment.id, child.id) },
      ]}
    />
  );
}
