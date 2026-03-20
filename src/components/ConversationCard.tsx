"use client";

import { ConversationSet } from "@/lib/types";

interface Props {
  conversation: ConversationSet;
}

const SPEAKER_COLORS = [
  "text-blue-700",
  "text-rose-700",
  "text-emerald-700",
];

export default function ConversationCard({ conversation }: Props) {
  const isDialogue = conversation.type === "dialogue";
  const speakerColorMap = new Map<string, string>();

  if (conversation.speakers) {
    conversation.speakers.forEach((s, i) => {
      speakerColorMap.set(s, SPEAKER_COLORS[i % SPEAKER_COLORS.length]);
    });
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div
        className={`px-4 py-3 border-b ${
          isDialogue ? "bg-indigo-50 border-indigo-100" : "bg-amber-50 border-amber-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{isDialogue ? "\uD83D\uDDE3\uFE0F" : "\uD83D\uDCE2"}</span>
          <span className="font-semibold text-gray-900">
            {isDialogue ? `대화 ${conversation.id}` : "독백"}
          </span>
          <span className="text-sm text-gray-600">
            {conversation.title}
          </span>
          {conversation.monologueType && (
            <span className="ml-auto text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              {conversation.monologueType}
            </span>
          )}
        </div>
        {conversation.speakers && (
          <div className="mt-1 text-xs text-gray-500">
            {conversation.speakers.join(" & ")}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        {conversation.lines.map((line, idx) => {
          const colorClass =
            speakerColorMap.get(line.speaker) || "text-gray-700";

          return (
            <div key={idx} className="flex gap-2 text-sm">
              {line.speaker ? (
                <>
                  <span className={`font-semibold min-w-[60px] ${colorClass}`}>
                    {line.speaker}:
                  </span>
                  <span className="text-gray-800">{line.text}</span>
                </>
              ) : (
                <span className="text-gray-800">{line.text}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
