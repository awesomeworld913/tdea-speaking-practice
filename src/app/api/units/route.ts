import { NextRequest, NextResponse } from "next/server";
import { parseCurriculum } from "@/lib/parseCurriculum";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const unitId = searchParams.get("unitId");

  const units = parseCurriculum();

  if (unitId) {
    const unit = units.get(unitId);
    if (!unit) {
      return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }
    return NextResponse.json(unit);
  }

  // Return selector items
  const items = Array.from(units.values())
    .map((u) => ({
      unitId: u.unitId,
      levelNumber: u.levelNumber,
      unitNumber: u.unitNumber,
      unitTitle: u.unitTitle,
      unitTopic: u.unitTopic,
      cefrLevel: u.cefrLevel,
    }))
    .sort((a, b) => {
      if (a.levelNumber !== b.levelNumber) return a.levelNumber - b.levelNumber;
      return a.unitNumber - b.unitNumber;
    });

  return NextResponse.json(items);
}
