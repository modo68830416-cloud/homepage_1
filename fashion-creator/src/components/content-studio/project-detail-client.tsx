"use client";

import { useMemo } from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GenerationPreview } from "@/components/content-studio/generation-preview";
import { StoryboardEditor } from "@/components/content-studio/storyboard-editor";
import { ChannelCopyEditor } from "@/components/content-studio/channel-copy-editor";
import { useContentProjects } from "@/lib/content-store";
import { useSavedLooks } from "@/lib/studio-store";
import { getDemoSourceLook, toContentSourceLook } from "@/lib/content-lookup";
import { VIDEO_FORMATS } from "@/types/content";

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const { projects, upsertProject } = useContentProjects();
  const { savedLooks } = useSavedLooks();
  const project = projects.find((item) => item.id === projectId);

  const sourceLook = useMemo(() => {
    if (!project) return null;
    const studioLook = savedLooks.find((look) => look.id === project.sourceLookId);
    if (studioLook) return toContentSourceLook(studioLook);
    return getDemoSourceLook();
  }, [project, savedLooks]);

  if (!project || !project.output || !sourceLook) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-24 text-center sm:px-8">
        <Compass className="h-8 w-8 text-foreground-subtle" aria-hidden="true" />
        <p className="text-sm text-foreground-muted">
          이 프로젝트를 찾을 수 없습니다. 다른 브라우저나 세션에서 만든 프로젝트일 수 있습니다.
        </p>
        <Button href="/create" variant="primary" className="text-xs">
          내 프로젝트로 이동
        </Button>
      </div>
    );
  }

  const isVideoFormat = VIDEO_FORMATS.includes(project.format);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
        <p className="mt-1 text-sm text-foreground-subtle">
          {new Date(project.createdAt).toLocaleString("ko-KR")}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <GenerationPreview content={project.output} look={sourceLook} />
        <div className="flex flex-col gap-8">
          {isVideoFormat && (
            <StoryboardEditor
              scenes={project.output.scenes}
              onChange={(scenes) =>
                upsertProject({ ...project, output: { ...project.output!, scenes }, updatedAt: new Date().toISOString() })
              }
            />
          )}
          {project.channelCopies && (
            <ChannelCopyEditor
              copies={project.channelCopies}
              onChange={(copies) => upsertProject({ ...project, channelCopies: copies, updatedAt: new Date().toISOString() })}
              look={sourceLook}
              state={project.settings}
            />
          )}
        </div>
      </div>
    </div>
  );
}
