import fs from "fs";
import path from "path";
import { UnitData, ExpressionSet, UnitSelectorItem } from "./types";

function parseExpressions(cols: string[]): ExpressionSet[] {
  const expressions: ExpressionSet[] = [];
  // Expressions 1-5 are at columns 23-37 (titleEn, titleJa, examples) x 5
  for (let i = 0; i < 5; i++) {
    const baseIdx = 23 + i * 3;
    const titleEn = (cols[baseIdx] || "").trim();
    const titleJa = (cols[baseIdx + 1] || "").trim();
    const examples = (cols[baseIdx + 2] || "").trim();
    if (titleEn || examples) {
      expressions.push({ titleEn, titleJa, examples });
    }
  }
  return expressions;
}

function parseGrammar(cols: string[]): string[] {
  const grammar: string[] = [];
  for (let i = 38; i <= 41; i++) {
    const g = (cols[i] || "").trim();
    if (g && g !== "-") {
      grammar.push(g);
    }
  }
  return grammar;
}

export function parseCurriculum(): Map<string, UnitData> {
  const filePath = path.join(process.cwd(), "public", "data", "curriculum.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const units = new Map<string, UnitData>();

  for (let i = 5; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split("\t");
    const levelId = (cols[0] || "").trim();
    const unitId = (cols[1] || "").trim();
    const lesson = parseInt(cols[7] || "0", 10);
    const unitType = (cols[6] || "").trim();

    // Only process lesson 1 of normal units
    if (lesson !== 1 || !levelId.startsWith("cr_")) continue;
    // Skip level test units
    if (unitType === "level test") continue;

    const levelNumber = parseInt(cols[4] || "0", 10);
    const unitNumber = parseInt(cols[5] || "0", 10);

    // Skip invalid entries
    if (isNaN(levelNumber) || isNaN(unitNumber) || unitNumber === 0) continue;

    const unitWords = (cols[20] || "")
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const subtopics = [cols[15], cols[16], cols[17]]
      .map((s) => (s || "").trim())
      .filter((s) => s.length > 0);

    const unit: UnitData = {
      levelId,
      unitId,
      cefrLevel: (cols[3] || "").trim(),
      levelNumber,
      unitNumber,
      unitTitle: (cols[13] || "").trim(),
      unitTopic: (cols[14] || "").trim(),
      subtopics,
      unitObjectiveKr: (cols[10] || "").trim(),
      unitObjectiveEn: (cols[11] || "").trim(),
      unitWords,
      expressionPattern: (cols[22] || "").trim(),
      expressions: parseExpressions(cols),
      grammar: parseGrammar(cols),
      preExposedGrammar: (cols[42] || "").trim(),
    };

    units.set(unitId, unit);
  }

  return units;
}

export function getUnitSelectorItems(): UnitSelectorItem[] {
  const units = parseCurriculum();
  const items: UnitSelectorItem[] = [];

  for (const unit of units.values()) {
    items.push({
      unitId: unit.unitId,
      levelNumber: unit.levelNumber,
      unitNumber: unit.unitNumber,
      unitTitle: unit.unitTitle,
      unitTopic: unit.unitTopic,
      cefrLevel: unit.cefrLevel,
    });
  }

  items.sort((a, b) => {
    if (a.levelNumber !== b.levelNumber) return a.levelNumber - b.levelNumber;
    return a.unitNumber - b.unitNumber;
  });

  return items;
}

export function getCumulativeWords(
  units: Map<string, UnitData>,
  targetUnit: UnitData
): string[] {
  const wordSet = new Set<string>();

  for (const unit of units.values()) {
    if (
      unit.levelNumber === targetUnit.levelNumber &&
      unit.unitNumber <= targetUnit.unitNumber
    ) {
      for (const word of unit.unitWords) {
        wordSet.add(word.toLowerCase());
      }
    }
  }

  return Array.from(wordSet).sort();
}
