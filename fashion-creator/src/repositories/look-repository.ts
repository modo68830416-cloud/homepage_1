import { ListRepository } from "@/repositories/base-repository";
import type { Look } from "@/types/studio";

export const lookRepository = new ListRepository<Look>("fashion-creator:saved-looks", []);
