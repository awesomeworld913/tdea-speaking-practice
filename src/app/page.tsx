"use client";

import { useState, useMemo, useCallback } from "react";
import { allScripts, ConversationSet, UnitScripts } from "../data/scripts";

// ======== Types ========
type PracticeMode = "roleplay" | "shadowing" | "quiz";
type Screen = "home" | "unit" | "practice";

// ======== Constants ========
const LEVEL_INFO: Record<number, { label: string; cefr: string; color: string }> = {
  1: { label: "Level 1", cefr: "A1", color: "bg-blue-500" },
  2: { label: "Level 2", cefr: "A1-A2", color: "bg-indigo-500" },
};

// ======== Main Page ========
export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitScripts | null>(null);
  const [selectedConv, setSelectedConv] = useState<ConversationSet | null>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("roleplay");

  const unitsByLevel = useMemo(() => {
    const map: Record<number, UnitScripts[]> = {};
    Object.values(allScripts).forEach((u) => {
      if (!map[u.levelNumber]) map[u.levelNumber] = [];
      map[u.levelNumber].push(u);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => a.unitNumber - b.unitNumber)
    );
    return map;
  }, []);

  const goHome = useCallback(() => {
    setScreen("home");
    setSelectedLevel(null);
    setSelectedUnit(null);
    setSelectedConv(null);
  }, []);

  const selectLevel = useCallback((lv: number) => {
    setSelectedLevel(lv);
    setScreen("home");
  }, []);

  const selectUnit = useCallback((unit: UnitScripts) => {
    setSelectedUnit(unit);
    setScreen("unit");
  }, []);

  const startPractice = useCallback(
    (conv: ConversationSet, mode: PracticeMode) => {
      setSelectedConv(conv);
      setPracticeMode(mode);
      setScreen("practice");
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={goHome} className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition">
            TDEA Speaking
          </button>
          {selectedUnit && screen !== "home" && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>/</span>
              <button
                onClick={() => { setScreen("home"); }}
                className="hover:text-indigo-600 transition"
              >
                Level {selectedUnit.levelNumber}
              </button>
              <span>/</span>
              <span className="text-gray-700">
                Unit {selectedUnit.unitNumber}: {selectedUnit.unitTopic}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {screen === "home" && (
          <HomeScreen
            unitsByLevel={unitsByLevel}
            selectedLevel={selectedLevel}
            onSelectLevel={selectLevel}
            onSelectUnit={selectUnit}
          />
        )}
        {screen === "unit" && selectedUnit && (
          <UnitScreen
            unit={selectedUnit}
            onStartPractice={startPractice}
            onBack={() => setScreen("home")}
          />
        )}
        {screen === "practice" && selectedConv && (
          <PracticeScreen
            conv={selectedConv}
            mode={practiceMode}
            onBack={() => setScreen("unit")}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-3 text-center text-xs text-gray-400">
        TDEA Speaking Practice — TODO English Academy
      </footer>
    </div>
  );
}

// ======== Home Screen ========
function HomeScreen({
  unitsByLevel,
  selectedLevel,
  onSelectLevel,
  onSelectUnit,
}: {
  unitsByLevel: Record<number, UnitScripts[]>;
  selectedLevel: number | null;
  onSelectLevel: (lv: number) => void;
  onSelectUnit: (unit: UnitScripts) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          영어 말하기 연습
        </h1>
        <p className="text-gray-500 text-sm">
          레벨과 유닛을 선택하여 대화 연습을 시작하세요
        </p>
      </div>

      {/* Level Tabs */}
      <div className="flex gap-3 justify-center">
        {Object.entries(LEVEL_INFO).map(([lv, info]) => {
          const lvNum = Number(lv);
          const isActive = selectedLevel === lvNum;
          return (
            <button
              key={lv}
              onClick={() => onSelectLevel(lvNum)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition ${
                isActive
                  ? `${info.color} text-white shadow-md`
                  : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {info.label} ({info.cefr})
            </button>
          );
        })}
      </div>

      {/* Unit Cards */}
      {selectedLevel && unitsByLevel[selectedLevel] && (
        <div className="grid gap-3 animate-fade-in">
          {unitsByLevel[selectedLevel].map((unit) => (
            <button
              key={unit.unitId}
              onClick={() => onSelectUnit(unit)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-indigo-300 hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-indigo-500 uppercase">
                    Unit {unit.unitNumber}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {unit.unitTopic}
                  </h3>
                </div>
                <div className="text-gray-300 group-hover:text-indigo-400 transition text-xl">
                  &rarr;
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                {unit.conversations.map((c) => (
                  <span
                    key={c.id}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      c.type === "dialogue"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {c.type === "dialogue" ? `D${c.id}` : "M"}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {!selectedLevel && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">&#x1F399;</p>
          <p>위에서 레벨을 선택하세요</p>
        </div>
      )}
    </div>
  );
}

// ======== Unit Screen ========
function UnitScreen({
  unit,
  onStartPractice,
  onBack,
}: {
  unit: UnitScripts;
  onStartPractice: (conv: ConversationSet, mode: PracticeMode) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <button
        onClick={onBack}
        className="text-sm text-indigo-500 hover:text-indigo-700 transition"
      >
        &larr; 레벨 목록으로
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-xl font-bold text-gray-800">
          Unit {unit.unitNumber}: {unit.unitTopic}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Level {unit.levelNumber} &middot; {unit.conversations.length}개 스크립트
        </p>
      </div>

      <div className="space-y-3">
        {unit.conversations.map((conv) => (
          <div
            key={conv.id}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      conv.type === "dialogue"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {conv.type === "dialogue" ? `대화 ${conv.id}` : "독백"}
                  </span>
                  {conv.monologueType && (
                    <span className="text-xs text-gray-400">
                      {conv.monologueType}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800">{conv.title}</h3>
                {conv.speakers && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {conv.speakers.join(" & ")} &middot; {conv.lines.length}턴
                  </p>
                )}
                {conv.type === "monologue" && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {conv.lines.length}문장
                  </p>
                )}
              </div>
            </div>

            {/* Preview - first 2 lines */}
            <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm space-y-1">
              {conv.lines.slice(0, 2).map((line, i) => (
                <p key={i} className="text-gray-600">
                  {line.speaker && (
                    <span className="font-medium text-gray-700">
                      {line.speaker}:{" "}
                    </span>
                  )}
                  {line.text}
                </p>
              ))}
              {conv.lines.length > 2 && (
                <p className="text-gray-400 text-xs">...</p>
              )}
            </div>

            {/* Practice Buttons */}
            <div className="mt-3 flex flex-wrap gap-2">
              {conv.type === "dialogue" && (
                <button
                  onClick={() => onStartPractice(conv, "roleplay")}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                >
                  역할 연습
                </button>
              )}
              <button
                onClick={() => onStartPractice(conv, "shadowing")}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
              >
                쉐도잉
              </button>
              <button
                onClick={() => onStartPractice(conv, "quiz")}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
              >
                빈칸 퀴즈
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======== Practice Screen ========
function PracticeScreen({
  conv,
  mode,
  onBack,
}: {
  conv: ConversationSet;
  mode: PracticeMode;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <button
        onClick={onBack}
        className="text-sm text-indigo-500 hover:text-indigo-700 transition"
      >
        &larr; 스크립트 목록으로
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              mode === "roleplay"
                ? "bg-indigo-50 text-indigo-600"
                : mode === "shadowing"
                ? "bg-green-50 text-green-600"
                : "bg-purple-50 text-purple-600"
            }`}
          >
            {mode === "roleplay"
              ? "역할 연습"
              : mode === "shadowing"
              ? "쉐도잉"
              : "빈칸 퀴즈"}
          </span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">{conv.title}</h2>
      </div>

      {mode === "roleplay" && conv.type === "dialogue" && (
        <RolePlayMode conv={conv} />
      )}
      {mode === "shadowing" && <ShadowingMode conv={conv} />}
      {mode === "quiz" && <QuizMode conv={conv} />}
      {mode === "roleplay" && conv.type === "monologue" && (
        <ShadowingMode conv={conv} />
      )}
    </div>
  );
}

// ======== Role Play Mode ========
function RolePlayMode({ conv }: { conv: ConversationSet }) {
  const speakers = conv.speakers || [];
  const [myRole, setMyRole] = useState<string | null>(null);
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());
  const [currentLine, setCurrentLine] = useState(0);

  const revealLine = useCallback(
    (idx: number) => {
      setRevealedLines((prev) => new Set(prev).add(idx));
      if (idx >= currentLine) {
        setCurrentLine(idx + 1);
      }
    },
    [currentLine]
  );

  const resetPractice = useCallback(() => {
    setRevealedLines(new Set());
    setCurrentLine(0);
    setMyRole(null);
  }, []);

  if (!myRole) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center space-y-4">
        <p className="text-gray-600 font-medium">연습할 역할을 선택하세요</p>
        <div className="flex gap-3 justify-center">
          {speakers.map((s) => (
            <button
              key={s}
              onClick={() => setMyRole(s)}
              className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition shadow-md"
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          선택한 역할의 대사는 숨겨집니다. 직접 말한 후 탭하여 확인하세요.
        </p>
      </div>
    );
  }

  const allRevealed = revealedLines.size >= conv.lines.filter((l) => l.speaker === myRole).length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          내 역할: <span className="font-semibold text-indigo-600">{myRole}</span>
        </p>
        <button
          onClick={resetPractice}
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          다시 시작
        </button>
      </div>

      {conv.lines.map((line, idx) => {
        const isMyLine = line.speaker === myRole;
        const isRevealed = revealedLines.has(idx);
        const isNext = idx === currentLine && isMyLine;

        return (
          <div
            key={idx}
            className={`rounded-xl p-3 transition-all ${
              isMyLine
                ? isRevealed
                  ? "bg-indigo-50 border border-indigo-200 animate-fade-in"
                  : isNext
                  ? "bg-indigo-100 border-2 border-indigo-300 animate-pulse-border cursor-pointer"
                  : "bg-gray-100 border border-gray-200 cursor-pointer"
                : "bg-white border border-gray-200"
            }`}
            onClick={() => {
              if (isMyLine && !isRevealed) revealLine(idx);
            }}
          >
            <p className="text-xs font-medium text-gray-500 mb-0.5">
              {line.speaker}
            </p>
            {isMyLine && !isRevealed ? (
              <p className="text-gray-400 italic text-sm">
                {isNext ? "탭하여 내 대사 확인하기..." : "..."}
              </p>
            ) : (
              <p className="text-gray-800">{line.text}</p>
            )}
          </div>
        );
      })}

      {allRevealed && (
        <div className="text-center py-4 animate-fade-in">
          <p className="text-green-600 font-semibold mb-2">
            모든 대사를 완료했습니다!
          </p>
          <button
            onClick={resetPractice}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition"
          >
            다시 연습하기
          </button>
        </div>
      )}
    </div>
  );
}

// ======== Shadowing Mode ========
function ShadowingMode({ conv }: { conv: ConversationSet }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const advance = useCallback(() => {
    if (currentIdx < conv.lines.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  }, [currentIdx, conv.lines.length]);

  const reset = useCallback(() => {
    setCurrentIdx(0);
    setShowAll(false);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          한 줄씩 따라 읽거나, 전체 보기를 선택하세요
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            {showAll ? "한 줄씩" : "전체 보기"}
          </button>
          <button
            onClick={reset}
            className="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            다시 시작
          </button>
        </div>
      </div>

      {showAll ? (
        <div className="space-y-2">
          {conv.lines.map((line, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-3"
            >
              {line.speaker && (
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  {line.speaker}
                </p>
              )}
              <p className="text-gray-800 text-lg">{line.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {conv.lines.slice(0, currentIdx + 1).map((line, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 transition-all ${
                idx === currentIdx
                  ? "bg-white border-2 border-indigo-300 shadow-md animate-fade-in"
                  : "bg-gray-50 border border-gray-200 opacity-60"
              }`}
            >
              {line.speaker && (
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {line.speaker}
                </p>
              )}
              <p
                className={`${
                  idx === currentIdx ? "text-xl text-gray-800" : "text-gray-600"
                }`}
              >
                {line.text}
              </p>
            </div>
          ))}

          {currentIdx < conv.lines.length - 1 ? (
            <button
              onClick={advance}
              className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition shadow-md"
            >
              다음 문장
            </button>
          ) : (
            <div className="text-center py-4 animate-fade-in">
              <p className="text-green-600 font-semibold mb-2">
                쉐도잉 완료!
              </p>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition"
              >
                다시 연습하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ======== Quiz Mode ========
function QuizMode({ conv }: { conv: ConversationSet }) {
  const blanks = useMemo(() => {
    return conv.lines.map((line) => {
      const words = line.text.split(" ");
      const candidates = words
        .map((w, i) => ({ w, i }))
        .filter(({ w }) => w.replace(/[^a-zA-Z]/g, "").length > 3);
      const picked: number[] = [];
      if (candidates.length > 0) {
        const idx = Math.floor(candidates.length * 0.5);
        picked.push(candidates[idx].i);
        if (candidates.length > 2) {
          const idx2 = Math.floor(candidates.length * 0.2);
          if (idx2 !== idx) picked.push(candidates[idx2].i);
        }
      }
      return { line, blankedIndices: picked, words };
    });
  }, [conv.lines]);

  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleReveal = useCallback((lineIdx: number, wordIdx: number) => {
    const key = `${lineIdx}-${wordIdx}`;
    setRevealed((prev) => new Set(prev).add(key));
  }, []);

  const reset = useCallback(() => setRevealed(new Set()), []);

  const allDone = blanks.every(({ blankedIndices }, li) =>
    blankedIndices.every((wi) => revealed.has(`${li}-${wi}`))
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          빈칸을 탭하여 정답을 확인하세요
        </p>
        <button
          onClick={reset}
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          다시 시작
        </button>
      </div>

      {blanks.map(({ line, blankedIndices, words }, lineIdx) => (
        <div
          key={lineIdx}
          className="bg-white rounded-xl border border-gray-200 p-3"
        >
          {line.speaker && (
            <p className="text-xs font-medium text-gray-500 mb-1">
              {line.speaker}
            </p>
          )}
          <p className="text-gray-800 leading-relaxed">
            {words.map((w, wi) => {
              const isBlanked = blankedIndices.includes(wi);
              const isRevealed = revealed.has(`${lineIdx}-${wi}`);

              if (!isBlanked) {
                return <span key={wi}>{w} </span>;
              }

              if (isRevealed) {
                return (
                  <span
                    key={wi}
                    className="font-semibold text-indigo-600 underline decoration-indigo-300 animate-fade-in"
                  >
                    {w}{" "}
                  </span>
                );
              }

              return (
                <button
                  key={wi}
                  onClick={() => toggleReveal(lineIdx, wi)}
                  className="inline-block bg-purple-100 text-purple-400 px-2 py-0.5 rounded-md text-sm hover:bg-purple-200 transition mx-0.5"
                >
                  {"_".repeat(Math.min(w.replace(/[^a-zA-Z]/g, "").length, 6))}
                </button>
              );
            })}
          </p>
        </div>
      ))}

      {allDone && (
        <div className="text-center py-4 animate-fade-in">
          <p className="text-green-600 font-semibold mb-2">
            모든 빈칸을 맞췄습니다!
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition"
          >
            다시 연습하기
          </button>
        </div>
      )}
    </div>
  );
}
