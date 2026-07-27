import { ListRepository, Repository } from "@/repositories/base-repository";
import type { ContentProject, ContentStudioState } from "@/types/content";

const MAX_PROJECTS = 30;

type ContentDraft = { settings: ContentStudioState; updatedAt: string } | null;

class ContentRepository extends ListRepository<ContentProject> {
  constructor() {
    super("fashion-creator:content-projects", []);
  }

  upsert(project: ContentProject): void {
    super.upsert(project);
    // Keep the project list bounded like the rest of the DEMO persistence.
    const trimmed = this.get().slice(0, MAX_PROJECTS);
    if (trimmed.length !== this.get().length) this.set(trimmed);
  }
}

export const contentRepository = new ContentRepository();

export const contentDraftRepository = new Repository<ContentDraft>(
  "fashion-creator:content-draft",
  null,
);
