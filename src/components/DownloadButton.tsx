"use client";

import { GenerationResponse } from "@/lib/types";

interface Props {
  data: GenerationResponse;
}

function generateTxt(data: GenerationResponse): string {
  let txt = `===================================\n`;
  txt += `TDEA 리스닝 스크립트\n`;
  txt += `Level ${data.levelNumber} (${data.cefrLevel}) - ${data.unitTopic}\n`;
  txt += `Title: ${data.unitTitle}\n`;
  txt += `===================================\n\n`;

  for (const conv of data.conversations) {
    const label = conv.type === "dialogue" ? `대화 ${conv.id}` : "독백";
    const typeInfo = conv.monologueType ? ` (${conv.monologueType})` : "";
    txt += `[${label}] ${conv.title}${typeInfo}\n`;

    if (conv.speakers) {
      txt += `(${conv.speakers.join(" & ")})\n`;
    }
    txt += `---\n`;

    for (const line of conv.lines) {
      if (line.speaker) {
        txt += `${line.speaker}: ${line.text}\n`;
      } else {
        txt += `${line.text}\n`;
      }
    }
    txt += `\n`;
  }

  return txt;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function DownloadButton({ data }: Props) {
  const baseFilename = `TDEA_L${data.levelNumber}_${data.unitTopic.replace(/\s+/g, "_")}`;

  const handleTxtDownload = () => {
    const txt = generateTxt(data);
    downloadFile(txt, `${baseFilename}_scripts.txt`, "text/plain;charset=utf-8");
  };

  const handleJsonDownload = () => {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `${baseFilename}_scripts.json`, "application/json;charset=utf-8");
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleTxtDownload}
        className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center gap-1"
      >
        TXT 다운로드
      </button>
      <button
        onClick={handleJsonDownload}
        className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 flex items-center gap-1"
      >
        JSON 다운로드
      </button>
    </div>
  );
}
