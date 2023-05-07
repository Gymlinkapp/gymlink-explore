import { UserPrompt } from "@/hooks/useGetUserByEmail";

export default function syncDailyPrompt(promptId: string, userPrompts: UserPrompt[]) {
  console.log(promptId)
  console.log(userPrompts)
  const prompt = userPrompts.find((prompt) => prompt.promptId === promptId);
  console.log(prompt)
  return prompt;
}
