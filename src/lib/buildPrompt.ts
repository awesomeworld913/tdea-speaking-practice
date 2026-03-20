import { UnitData } from "./types";

export function buildSystemPrompt(): string {
  return `You are a professional English listening script generator for TODO English Academy (TDEA).
Your job is to create natural, educational listening practice scripts for Korean students learning English.

STRICT RULES:
1. Use ONLY the vocabulary words provided below. You may also use basic function words (a, an, the, is, are, am, was, were, do, does, did, can, will, would, to, in, on, at, of, and, or, but, not, yes, no, this, that, it, there, here, with, from, for, about, up, down, out, off, very, so, too, also, just, well, oh, wow, okay, please, right, really).
2. Use ONLY the expression patterns and grammar structures listed below.
3. Match the difficulty level strictly.
4. All dialogues must sound natural and be contextually appropriate for the given topic and subtopics.
5. Use diverse character names (mix of Korean and Western names).
6. Each dialogue should have a different scenario/setting related to the subtopics.

OUTPUT FORMAT:
Return ONLY a valid JSON array with exactly 5 objects. No markdown, no code blocks, no explanation.
Sets 1-4: Two-person dialogues. Set 5: A monologue (announcement, advertisement, audio guide, news report, voicemail, or similar).

Each object:
{
  "id": number (1-5),
  "type": "dialogue" or "monologue",
  "title": "short descriptive title in English",
  "monologueType": "announcement" | "advertisement" | "guide" | "news" | "voicemail" (only for set 5),
  "speakers": ["Name1", "Name2"] (only for dialogues),
  "lines": [
    {"speaker": "Name1" or "" for monologue narrator, "text": "English sentence"}
  ]
}`;
}

export function buildUserPrompt(
  unit: UnitData,
  cumulativeWords: string[]
): string {
  const levelGuide = getLevelGuide(unit.levelNumber);

  let prompt = `Generate 5 listening practice scripts for:

📚 TODO English Academy Level: ${unit.levelNumber}
📖 Unit ${unit.unitNumber}: "${unit.unitTitle}"
🎯 Topic: ${unit.unitTopic}
📝 Subtopics: ${unit.subtopics.join(" / ")}
🎓 Learning Objective: ${unit.unitObjectiveEn || unit.unitObjectiveKr}

${levelGuide}

📗 VOCABULARY (use only these words + basic function words):
${cumulativeWords.join(", ")}

📘 EXPRESSION PATTERN:
${unit.expressionPattern || "N/A"}

📙 EXPRESSIONS TO USE:`;

  for (const expr of unit.expressions) {
    if (expr.titleEn || expr.examples) {
      prompt += `\n[${expr.titleEn}]\n${expr.examples}`;
    }
  }

  if (unit.grammar.length > 0) {
    prompt += `\n\n📕 GRAMMAR:\n${unit.grammar.join("\n")}`;
  }

  prompt += `

REQUIREMENTS:
- Dialogues 1-4: Each must have 6-10 turns total (3-5 per speaker), covering different subtopics/scenarios.
- Monologue (Set 5): 6-12 sentences, appropriate format for the topic.
- Every script must use several of the listed expression patterns naturally.
- Return ONLY the JSON array. No other text.`;

  return prompt;
}

function getLevelGuide(level: number): string {
  switch (level) {
    case 0:
      return `⚡ DIFFICULTY: Level 0 (Pre-A1 Beginner)
- Very short sentences: 2-5 words each
- Present tense only (am/is/are)
- Simple greetings, introductions, basic nouns and adjectives
- No complex grammar`;
    case 1:
      return `⚡ DIFFICULTY: Level 1 (A1 Elementary)
- Short sentences: 3-7 words each
- Present simple tense, basic imperatives
- Simple questions and answers
- Basic connectors (and, but)`;
    case 2:
      return `⚡ DIFFICULTY: Level 2 (A1+ Elementary)
- Sentences: 4-8 words each
- Present and past simple tense
- Yes/No questions and Wh-questions
- Time expressions, frequency adverbs`;
    case 3:
      return `⚡ DIFFICULTY: Level 3 (A2 Pre-Intermediate)
- Sentences: 5-10 words each
- Present, past, future tenses
- Comparatives, superlatives
- Compound sentences with conjunctions`;
    case 4:
      return `⚡ DIFFICULTY: Level 4 (A2+ Pre-Intermediate)
- Sentences: 6-12 words each
- Various tenses including present perfect
- Complex questions, relative clauses (basic)
- Expressing opinions, giving reasons`;
    default:
      return `⚡ DIFFICULTY: Adjust to appropriate level`;
  }
}
