import { generateAllChannelCopies } from "@/lib/copy-generator";
import { contentRepository } from "@/repositories/content-repository";
import type { ChannelCopy, ContentProject, ContentSourceLook, ContentStudioState, GeneratedContent } from "@/types/content";

// Generation itself now runs through the AI Gateway (src/ai/gateway) —
// this service is left owning the DEMO-only concern of turning a generated
// result into a persisted ContentProject.
export const DemoContentService = {
  saveProject(
    settings: ContentStudioState,
    sourceLook: ContentSourceLook,
    content: GeneratedContent,
  ): { project: ContentProject; copies: ChannelCopy[] } {
    const copies = generateAllChannelCopies(sourceLook, settings);
    const project: ContentProject = {
      id: content.projectId,
      title: `${sourceLook.name} · ${settings.format}`,
      sourceLookId: sourceLook.id,
      format: settings.format,
      status: "completed",
      thumbnailSeed: content.mediaSeed,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settings,
      output: content,
      channelCopies: copies,
      isFavorite: false,
      isDemo: true,
    };

    contentRepository.upsert(project);
    return { project, copies };
  },

  listProjects(): ContentProject[] {
    return contentRepository.getAll();
  },
};
