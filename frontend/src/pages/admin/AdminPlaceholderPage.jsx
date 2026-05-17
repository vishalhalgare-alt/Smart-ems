import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";

export default function AdminPlaceholderPage({ title, description }) {
  return (
    <>
      <PageHeader eyebrow="Admin Workspace" title={title} description={description} />
      <SectionCard eyebrow="Module" title={`${title} Overview`}>
        <p className="text-muted">
          This module is ready for production screens, forms, tables, and API integration.
        </p>
      </SectionCard>
    </>
  );
}
