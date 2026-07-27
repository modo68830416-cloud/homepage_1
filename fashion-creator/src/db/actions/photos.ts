"use server";

import { put } from "@vercel/blob";
import { requireUserId } from "@/db/actions/require-user";

// Signed-in users only — Guest Mode never calls this, so a guest's photo
// never leaves the browser (it's not even stored in localStorage; see
// PhotoUploadStep, which only keeps an in-memory object URL). Access is
// "private": the object is not reachable by a public URL, only through a
// signed read from this same server.
export async function uploadAvatarPhotoRemote(formData: FormData): Promise<{ pathname: string }> {
  const userId = await requireUserId();
  const file = formData.get("photo");
  if (!(file instanceof File)) throw new Error("No photo file provided");

  const blob = await put(`avatars/${userId}/${crypto.randomUUID()}-${file.name}`, file, {
    access: "private",
  });

  return { pathname: blob.pathname };
}
