import ServicePageLayout from "../components/ServicePageLayout";
import { HUB } from "@/lib/ecosystem";

export const metadata = {
  title: `${HUB.title} | پیشران`,
  description: HUB.description,
};

export default function SafarPage() {
  return (
    <ServicePageLayout
      title={HUB.title}
      description={HUB.description}
      paragraphs={HUB.paragraphs}
      showEcosystemIndex
      hub
      breadcrumb={[{ label: HUB.title, href: HUB.href }]}
    />
  );
}
