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
