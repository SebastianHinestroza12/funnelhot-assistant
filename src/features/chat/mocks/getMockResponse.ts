
import { MOCK_RESPONSES } from "@/features/chat/mocks/mockResponses";
import { ResponseLength } from "@/features/assistants/interfaces";

export const getResponseSize = (
  responseLength: ResponseLength,
): "short" | "medium" | "long" => {
  const rand = Math.random() * 100;

  if (rand <= responseLength.short) return "short";
  if (rand <= responseLength.short + responseLength.medium) return "medium";
  return "long";
};

export const getMockResponse = (responseLength: ResponseLength) => {
  const size = getResponseSize(responseLength);

  const candidates = MOCK_RESPONSES.filter((r) => r.size === size);
  return candidates[Math.floor(Math.random() * candidates.length)];
};
