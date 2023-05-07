import { UserPrompt } from "@/hooks/useGetUserByEmail";

export default function syncDailyPrompt(promptId: string, userPrompts: UserPrompt[]) {
  const prompt = userPrompts.find((prompt) => prompt.promptId === promptId);
  return prompt;
}
