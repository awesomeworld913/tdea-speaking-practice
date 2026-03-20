import { NextRequest, NextResponse } from "next/server";
import {
  parseCurriculum,
  getCumulativeWords,
} from "@/lib/parseCurriculum";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/buildPrompt";
import { generateScripts } from "@/lib/claudeClient";
import { GenerationResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { unitId, apiKey } = body;

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { error: "API 키를 입력해주세요." },
        { status: 401 }
      );
    }

    if (!unitId || typeof unitId !== "string") {
      return NextResponse.json(
        { error: "유닛을 선택해주세요." },
        { status: 400 }
      );
    }

    const units = parseCurriculum();
    const targetUnit = units.get(unitId);

    if (!targetUnit) {
      return NextResponse.json(
        { error: "선택한 유닛을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const cumulativeWords = getCumulativeWords(units, targetUnit);
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(targetUnit, cumulativeWords);

    const conversations = await generateScripts(
      apiKey,
      systemPrompt,
      userPrompt
    );

    const response: GenerationResponse = {
      conversations,
      unitTitle: targetUnit.unitTitle,
      unitTopic: targetUnit.unitTopic,
      levelNumber: targetUnit.levelNumber,
      cefrLevel: targetUnit.cefrLevel,
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };

    if (err.status === 401) {
      return NextResponse.json(
        { error: "API 키가 유효하지 않습니다. 올바른 키를 입력해주세요." },
        { status: 401 }
      );
    }

    if (err.status === 429) {
      return NextResponse.json(
        { error: "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    console.error("Generation error:", err.message || error);
    return NextResponse.json(
      {
        error:
          "스크립트 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
