export interface ExpressionSet {
  titleEn: string;
  titleJa: string;
  examples: string;
}

export interface UnitData {
  levelId: string;
  unitId: string;
  cefrLevel: string;
  levelNumber: number;
  unitNumber: number;
  unitTitle: string;
  unitTopic: string;
  subtopics: string[];
  unitObjectiveKr: string;
  unitObjectiveEn: string;
  unitWords: string[];
  expressionPattern: string;
  expressions: ExpressionSet[];
  grammar: string[];
  preExposedGrammar: string;
}

export interface ScriptLine {
  speaker: string;
  text: string;
}

export interface ConversationSet {
  id: number;
  type: "dialogue" | "monologue";
  title: string;
  monologueType?: string;
  speakers?: string[];
  lines: ScriptLine[];
}

export interface GenerationRequest {
  unitId: string;
  apiKey: string;
}

export interface GenerationResponse {
  conversations: ConversationSet[];
  unitTitle: string;
  unitTopic: string;
  levelNumber: number;
  cefrLevel: string;
}

export interface UnitSelectorItem {
  unitId: string;
  levelNumber: number;
  unitNumber: number;
  unitTitle: string;
  unitTopic: string;
  cefrLevel: string;
}
