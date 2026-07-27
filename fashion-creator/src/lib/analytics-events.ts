// Event names reserved for the AI Model & Avatar flow. Not wired to a real
// analytics provider yet — no personal data or image payloads should ever be
// attached when these are eventually dispatched.
export const AVATAR_ANALYTICS_EVENTS = {
  modelLibraryViewed: "model_library_viewed",
  presetModelSelected: "preset_model_selected",
  avatarCreationStarted: "avatar_creation_started",
  avatarPhotoSelected: "avatar_photo_selected",
  avatarBodyProfileCompleted: "avatar_body_profile_completed",
  avatarDemoGenerated: "avatar_demo_generated",
  avatarSaved: "avatar_saved",
  avatarSentToStudio: "avatar_sent_to_studio",
} as const;

// Event names reserved for the Content Studio / project history flow. Not
// wired to a real analytics provider yet — no personal data or image
// payloads should ever be attached when these are eventually dispatched.
export const CONTENT_ANALYTICS_EVENTS = {
  contentProjectCreated: "content_project_created",
  contentProjectOpened: "content_project_opened",
  contentProjectDuplicated: "content_project_duplicated",
  contentProjectDeleted: "content_project_deleted",
  contentExported: "content_exported",
  contentDraftRecovered: "content_draft_recovered",
} as const;
