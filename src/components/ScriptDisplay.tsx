"use client";

import { ConversationSet } from "@/lib/types";
import ConversationCard from "./ConversationCard";

interface Props {
  conversations: ConversationSet[];
  unitTitle: string;
  unitTopic: string;
  levelNumber: number;
}

export default function ScriptDisplay({
  conversations,
  unitTitle,
  unitTopic,
  levelNumber,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">
          Level {levelNumber} - {unitTitle}
        </h2>
        <p className="text-sm text-gray-600">Topic: {unitTopic}</p>
      </div>

      {conversations.map((conv) => (
        <ConversationCard key={conv.id} conversation={conv} />
      ))}
    </div>
  );
}
