import type { Metadata } from "next";
import { ProjectDetailClient } from "@/components/content-studio/project-detail-client";

export const metadata: Metadata = {
  title: "Content Project",
};

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  return <ProjectDetailClient projectId={projectId} />;
}
