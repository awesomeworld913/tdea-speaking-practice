/**
 * 커리큘럼 데이터를 기반으로 전체 66개 유닛의 리스닝 스크립트를 생성하는 스크립트.
 * 각 유닛의 표현/단어/소재를 활용하여 2인 대화 4개 + 독백 1개를 구성.
 *
 * 실행: npx tsx scripts/generateAll.ts
 */

import fs from "fs";
import path from "path";

interface ExpressionSet {
  titleEn: string;
  examples: string;
}

interface UnitInfo {
  unitId: string;
  levelNumber: number;
  unitNumber: number;
  unitTitle: string;
  unitTopic: string;
  cefrLevel: string;
  subtopics: string[];
  objectiveKr: string;
  objectiveEn: string;
  words: string[];
  expressionPattern: string;
  expressions: ExpressionSet[];
  grammar: string[];
}

interface ScriptLine {
  speaker: string;
  text: string;
}

interface ConversationSet {
  id: number;
  type: "dialogue" | "monologue";
  title: string;
  monologueType?: string;
  speakers?: string[];
  lines: ScriptLine[];
}

// 이름 풀
const KOREAN_NAMES = ["Mina", "Jinu", "Sora", "Hana", "Yuna", "Jiho", "Suho", "Nari", "Dain", "Taeho", "Eunji", "Seojun"];
const WESTERN_NAMES = ["Jake", "Emma", "Brian", "Kelly", "Tom", "Lisa", "Mike", "Amy", "Sam", "Lily", "Ben", "Zoe"];

function pickNames(idx: number): [string, string] {
  const k = KOREAN_NAMES[idx % KOREAN_NAMES.length];
  const w = WESTERN_NAMES[idx % WESTERN_NAMES.length];
  return idx % 2 === 0 ? [k, w] : [w, k];
}

const MONOLOGUE_TYPES = ["announcement", "advertisement", "guide", "news", "voicemail"];

function parseExpressionLines(examples: string): string[] {
  return examples
    .split(/[-–•]/)
    .map(s => s.trim())
    .filter(s => s.length > 2)
    .map(s => s.replace(/\s*\/\s*/g, " / ").replace(/\[([^\]]+)\]/g, "$1"));
}

function fillTemplate(template: string, replacements: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\b${key}\\b`, "g"), value);
  }
  return result;
}

function generateDialogue(
  unit: UnitInfo,
  dialogueIndex: number,
  subtopicIndex: number
): ConversationSet {
  const [speaker1, speaker2] = pickNames(unit.unitNumber * 4 + dialogueIndex);
  const lines: ScriptLine[] = [];

  // Use expressions from the unit
  const exprSets = unit.expressions;
  const subtopic = unit.subtopics[subtopicIndex % Math.max(unit.subtopics.length, 1)] || unit.unitTopic;

  // Extract expression lines from each set
  const allExprLines: string[][] = exprSets.map(e => parseExpressionLines(e.examples));

  // Build dialogue from expression sets
  // Strategy: alternate speakers using different expression sets
  const usedLines: string[] = [];

  for (let setIdx = 0; setIdx < allExprLines.length && lines.length < 10; setIdx++) {
    const exprLines = allExprLines[setIdx];
    for (let lineIdx = 0; lineIdx < exprLines.length && lines.length < 10; lineIdx++) {
      const text = exprLines[lineIdx].trim();
      if (!text || text.length < 3) continue;

      // Clean up template markers
      let cleanText = text
        .replace(/\(([^)]+)\)/g, "")
        .replace(/\[([^\]]+)\]/g, "$1")
        .replace(/\s+/g, " ")
        .trim();

      if (cleanText.length < 3) continue;

      // Alternate speakers
      const speaker = lines.length % 2 === 0 ? speaker1 : speaker2;

      // Skip duplicates
      if (usedLines.includes(cleanText)) continue;
      usedLines.push(cleanText);

      lines.push({ speaker, text: cleanText });
    }
  }

  // If we have too few lines, add some basic exchanges
  if (lines.length < 6) {
    const fillers = getFillerLines(unit, speaker1, speaker2, lines.length);
    lines.push(...fillers);
  }

  // Ensure even number of lines and reasonable length
  if (lines.length > 10) lines.length = 10;
  if (lines.length % 2 !== 0 && lines.length > 1) lines.length = lines.length - 1;

  // Create title from subtopic
  const titleWords = subtopic.split(/\s+/).filter(w => /[a-zA-Z]/.test(w));
  const title = titleWords.length > 0
    ? titleWords.slice(0, 4).join(" ")
    : `${unit.unitTopic} Talk ${dialogueIndex + 1}`;

  return {
    id: dialogueIndex + 1,
    type: "dialogue",
    title,
    speakers: [speaker1, speaker2],
    lines,
  };
}

function getFillerLines(
  unit: UnitInfo,
  s1: string,
  s2: string,
  currentCount: number
): ScriptLine[] {
  const fillers: ScriptLine[] = [];
  const words = unit.words.slice(0, 10);
  const topic = unit.unitTopic;

  // Generic exchanges based on level
  if (unit.levelNumber === 0) {
    const exchanges = [
      [{ speaker: s1, text: "Hi!" }, { speaker: s2, text: "Hello!" }],
      [{ speaker: s1, text: "Yes!" }, { speaker: s2, text: "Okay!" }],
      [{ speaker: s1, text: "Thank you." }, { speaker: s2, text: "You're welcome." }],
      [{ speaker: s1, text: "Goodbye!" }, { speaker: s2, text: "Bye!" }],
    ];
    for (const ex of exchanges) {
      if (currentCount + fillers.length >= 8) break;
      fillers.push(...ex);
    }
  } else if (unit.levelNumber <= 2) {
    const exchanges = [
      [{ speaker: s1, text: `Do you like ${words[0] || topic.toLowerCase()}?` }, { speaker: s2, text: "Yes, I do!" }],
      [{ speaker: s1, text: "That sounds great." }, { speaker: s2, text: "Thank you!" }],
      [{ speaker: s1, text: "What about you?" }, { speaker: s2, text: `I like ${words[1] || "it"}, too.` }],
    ];
    for (const ex of exchanges) {
      if (currentCount + fillers.length >= 8) break;
      fillers.push(...ex);
    }
  } else {
    const exchanges = [
      [{ speaker: s1, text: `Have you heard about ${words[0] || topic.toLowerCase()}?` }, { speaker: s2, text: "Yes, I have. It's really interesting." }],
      [{ speaker: s1, text: "I think so, too." }, { speaker: s2, text: "We should learn more about it." }],
      [{ speaker: s1, text: "That's a good idea." }, { speaker: s2, text: "Let's do it together." }],
    ];
    for (const ex of exchanges) {
      if (currentCount + fillers.length >= 8) break;
      fillers.push(...ex);
    }
  }

  return fillers;
}

function generateMonologue(unit: UnitInfo): ConversationSet {
  const lines: ScriptLine[] = [];
  const monologueType = MONOLOGUE_TYPES[unit.unitNumber % MONOLOGUE_TYPES.length];
  const topic = unit.unitTopic;
  const words = unit.words;

  // Opening based on monologue type
  switch (monologueType) {
    case "announcement":
      lines.push({ speaker: "", text: "Attention, please. This is an important announcement." });
      break;
    case "advertisement":
      lines.push({ speaker: "", text: `Are you interested in ${topic.toLowerCase()}? Listen to this!` });
      break;
    case "guide":
      lines.push({ speaker: "", text: `Welcome! Today, we will learn about ${topic.toLowerCase()}.` });
      break;
    case "news":
      lines.push({ speaker: "", text: `Good morning. Here is today's news about ${topic.toLowerCase()}.` });
      break;
    case "voicemail":
      lines.push({ speaker: "", text: `Hi! This is a message for you about ${topic.toLowerCase()}.` });
      break;
  }

  // Use expression examples as monologue content
  for (const expr of unit.expressions) {
    const exprLines = parseExpressionLines(expr.examples);
    for (const line of exprLines) {
      if (lines.length >= 10) break;
      const cleanLine = line
        .replace(/\(([^)]+)\)/g, "")
        .replace(/\[([^\]]+)\]/g, (_, m) => m)
        .replace(/\s+/g, " ")
        .trim();
      if (cleanLine.length >= 3 && !cleanLine.includes("?")) {
        lines.push({ speaker: "", text: cleanLine });
      }
    }
  }

  // Add word-based content if needed
  if (lines.length < 6) {
    const sampleWords = words.slice(0, 5).join(", ");
    if (unit.levelNumber <= 1) {
      lines.push({ speaker: "", text: `Remember these words: ${sampleWords}.` });
      lines.push({ speaker: "", text: "Practice them every day." });
    } else {
      lines.push({ speaker: "", text: `Key words for today are: ${sampleWords}.` });
      lines.push({ speaker: "", text: "These words are very useful." });
    }
  }

  // Closing
  if (lines.length < 10) {
    switch (monologueType) {
      case "announcement":
        lines.push({ speaker: "", text: "Thank you for listening." });
        break;
      case "advertisement":
        lines.push({ speaker: "", text: "Don't miss this chance!" });
        break;
      case "guide":
        lines.push({ speaker: "", text: "Thank you and have a great day!" });
        break;
      case "news":
        lines.push({ speaker: "", text: "That's all for today's news. Goodbye!" });
        break;
      case "voicemail":
        lines.push({ speaker: "", text: "Please call me back. Thank you!" });
        break;
    }
  }

  if (lines.length > 12) lines.length = 12;

  const titleMap: Record<string, string> = {
    announcement: `School Announcement: ${topic}`,
    advertisement: `${topic} Advertisement`,
    guide: `${topic} Guide`,
    news: `${topic} News Report`,
    voicemail: `Voicemail about ${topic}`,
  };

  return {
    id: 5,
    type: "monologue",
    title: titleMap[monologueType] || `About ${topic}`,
    monologueType,
    lines,
  };
}

function generateUnitScripts(unit: UnitInfo): ConversationSet[] {
  const scripts: ConversationSet[] = [];

  // 4 dialogues (each using different subtopics if available)
  for (let i = 0; i < 4; i++) {
    scripts.push(generateDialogue(unit, i, i));
  }

  // 1 monologue
  scripts.push(generateMonologue(unit));

  return scripts;
}

// Main
function main() {
  const filePath = path.join(process.cwd(), "public", "data", "curriculum.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const units: UnitInfo[] = [];

  for (let i = 5; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = line.split("\t");
    const levelId = (cols[0] || "").trim();
    const unitId = (cols[1] || "").trim();
    const lesson = parseInt(cols[7] || "0", 10);
    const unitType = (cols[6] || "").trim();
    if (lesson !== 1 || !levelId.startsWith("cr_")) continue;
    if (unitType === "level test") continue;
    const levelNumber = parseInt(cols[4] || "0", 10);
    const unitNumber = parseInt(cols[5] || "0", 10);
    if (isNaN(levelNumber) || isNaN(unitNumber) || unitNumber === 0) continue;

    const expressions: ExpressionSet[] = [];
    for (let j = 0; j < 5; j++) {
      const be = 23 + j * 3;
      const te = (cols[be] || "").trim();
      const ex = (cols[be + 2] || "").trim();
      if (te || ex) expressions.push({ titleEn: te, examples: ex });
    }

    const grammar: string[] = [];
    for (let g = 38; g <= 41; g++) {
      const gv = (cols[g] || "").trim();
      if (gv && gv !== "-") grammar.push(gv);
    }

    units.push({
      unitId,
      levelNumber,
      unitNumber,
      unitTitle: (cols[13] || "").trim(),
      unitTopic: (cols[14] || "").trim(),
      cefrLevel: (cols[3] || "").trim(),
      subtopics: [cols[15], cols[16], cols[17]].map(s => (s || "").trim()).filter(s => s.length > 0),
      objectiveKr: (cols[10] || "").trim(),
      objectiveEn: (cols[11] || "").trim(),
      words: (cols[20] || "").trim().split(/\s+/).filter(w => w.length > 0),
      expressionPattern: (cols[22] || "").trim(),
      expressions,
      grammar,
    });
  }

  console.log(`Generating scripts for ${units.length} units...`);

  const allScripts: Record<string, {
    unitId: string;
    unitTitle: string;
    unitTopic: string;
    levelNumber: number;
    cefrLevel: string;
    conversations: ConversationSet[];
  }> = {};

  for (const unit of units) {
    const conversations = generateUnitScripts(unit);
    allScripts[unit.unitId] = {
      unitId: unit.unitId,
      unitTitle: unit.unitTitle,
      unitTopic: unit.unitTopic,
      levelNumber: unit.levelNumber,
      cefrLevel: unit.cefrLevel,
      conversations,
    };
    console.log(`  ✓ ${unit.unitId} (L${unit.levelNumber} U${unit.unitNumber}: ${unit.unitTopic}) — ${conversations.reduce((a, c) => a + c.lines.length, 0)} lines`);
  }

  const outPath = path.join(process.cwd(), "src", "data", "pregenerated.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(allScripts, null, 2), "utf-8");
  console.log(`\nDone! Saved to ${outPath}`);
  console.log(`Total units: ${Object.keys(allScripts).length}`);
}

main();
