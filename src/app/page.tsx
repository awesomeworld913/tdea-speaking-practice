"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { allScripts, ConversationSet, UnitScripts } from "../data/scripts";

// ======== Types ========
type PracticeMode = "roleplay" | "shadowing" | "quiz";
type Screen = "home" | "unit" | "practice";

// ======== TTS (Text-to-Speech) ========
function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(0.85);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = rate;
      utter.pitch = 1;
      // Try to pick a good English voice
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(
        (v) => v.lang.startsWith("en") && v.name.includes("Samantha")
      ) || voices.find((v) => v.lang.startsWith("en-US")) || voices.find((v) => v.lang.startsWith("en"));
      if (enVoice) utter.voice = enVoice;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => {
        setSpeaking(false);
        onEnd?.();
      };
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    },
    [rate]
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  // Preload voices
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return { speak, stop, speaking, rate, setRate };
}

// ======== STT (Speech-to-Text) ========
type SpeechRecognitionType = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: { [key: number]: { [key: number]: { transcript: string } } }; resultIndex: number }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function useSTT() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저에서는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.");
      return;
    }
    const recognition = new (SpeechRecognition as new () => SpeechRecognitionType)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (e) => {
      const result = e.results[e.resultIndex][0].transcript;
      setTranscript(result);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    setTranscript("");
    setListening(true);
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const clearTranscript = useCallback(() => setTranscript(""), []);

  return { listening, transcript, startListening, stopListening, clearTranscript };
}

// Simple word-level comparison
function compareTexts(expected: string, actual: string): { match: boolean; score: number } {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/);
  const expWords = normalize(expected);
  const actWords = normalize(actual);
  let matched = 0;
  for (const w of expWords) {
    if (actWords.includes(w)) matched++;
  }
  const score = expWords.length > 0 ? Math.round((matched / expWords.length) * 100) : 0;
  return { match: score >= 80, score };
}

// ======== Speaker Button ========
function SpeakButton({
  text,
  tts,
  size = "sm",
  onEnd,
}: {
  text: string;
  tts: ReturnType<typeof useTTS>;
  size?: "sm" | "md";
  onEnd?: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        tts.speak(text, onEnd);
      }}
      disabled={tts.speaking}
      className={`inline-flex items-center justify-center rounded-full transition hover:bg-indigo-100 ${
        size === "md" ? "w-9 h-9" : "w-7 h-7"
      } ${tts.speaking ? "text-indigo-300" : "text-indigo-500"}`}
      title="듣기"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={size === "md" ? "w-5 h-5" : "w-4 h-4"}
      >
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
        <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
      </svg>
    </button>
  );
}

// ======== Mic Button ========
function MicButton({
  stt,
  expected,
  onResult,
}: {
  stt: ReturnType<typeof useSTT>;
  expected: string;
  onResult?: (score: number) => void;
}) {
  const [result, setResult] = useState<{ score: number; match: boolean } | null>(null);

  useEffect(() => {
    if (stt.transcript && expected) {
      const r = compareTexts(expected, stt.transcript);
      setResult(r);
      onResult?.(r.score);
    }
  }, [stt.transcript, expected, onResult]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setResult(null);
          stt.clearTranscript();
          if (stt.listening) {
            stt.stopListening();
          } else {
            stt.startListening();
          }
        }}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${
          stt.listening
            ? "bg-red-500 text-white animate-pulse"
            : "bg-rose-50 text-rose-500 hover:bg-rose-100"
        }`}
        title={stt.listening ? "녹음 중..." : "말하기"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
          <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
        </svg>
      </button>
      {stt.transcript && result && (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full animate-fade-in ${
            result.match
              ? "bg-green-50 text-green-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {result.score}%
        </span>
      )}
    </div>
  );
}

// ======== Speed Control ========
function SpeedControl({ rate, setRate }: { rate: number; setRate: (r: number) => void }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>속도</span>
      <input
        type="range"
        min="0.5"
        max="1.2"
        step="0.05"
        value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
        className="w-20 accent-indigo-500"
      />
      <span className="w-8 text-center">{rate.toFixed(2)}x</span>
    </div>
  );
}

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
  const tts = useTTS();
  const stt = useSTT();

  // Stop TTS/STT when leaving
  useEffect(() => {
    return () => {
      tts.stop();
      stt.stopListening();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            tts.stop();
            stt.stopListening();
            onBack();
          }}
          className="text-sm text-indigo-500 hover:text-indigo-700 transition"
        >
          &larr; 스크립트 목록으로
        </button>
        <SpeedControl rate={tts.rate} setRate={tts.setRate} />
      </div>

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
        <RolePlayMode conv={conv} tts={tts} stt={stt} />
      )}
      {mode === "shadowing" && <ShadowingMode conv={conv} tts={tts} />}
      {mode === "quiz" && <QuizMode conv={conv} tts={tts} />}
      {mode === "roleplay" && conv.type === "monologue" && (
        <ShadowingMode conv={conv} tts={tts} />
      )}
    </div>
  );
}

// ======== Role Play Mode ========
function RolePlayMode({
  conv,
  tts,
  stt,
}: {
  conv: ConversationSet;
  tts: ReturnType<typeof useTTS>;
  stt: ReturnType<typeof useSTT>;
}) {
  const speakers = conv.speakers || [];
  const [myRole, setMyRole] = useState<string | null>(null);
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());
  const [currentLine, setCurrentLine] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

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
    tts.stop();
    stt.stopListening();
  }, [tts, stt]);

  // Auto-play partner lines when they become current
  useEffect(() => {
    if (!myRole || !autoPlay) return;
    if (currentLine >= conv.lines.length) return;
    const line = conv.lines[currentLine];
    if (line.speaker !== myRole) {
      // Partner's line — auto-play TTS
      tts.speak(line.text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine, myRole, autoPlay]);

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
          상대방 대사는 자동으로 재생됩니다. 내 대사는 마이크로 말한 후 확인하세요.
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
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
              className="accent-indigo-500"
            />
            자동 재생
          </label>
          <button
            onClick={resetPractice}
            className="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            다시 시작
          </button>
        </div>
      </div>

      {conv.lines.map((line, idx) => {
        const isMyLine = line.speaker === myRole;
        const isRevealed = revealedLines.has(idx);
        const isNext = idx === currentLine && isMyLine;
        const isPartnerNext = idx === currentLine && !isMyLine;

        return (
          <div
            key={idx}
            className={`rounded-xl p-3 transition-all ${
              isMyLine
                ? isRevealed
                  ? "bg-indigo-50 border border-indigo-200 animate-fade-in"
                  : isNext
                  ? "bg-indigo-100 border-2 border-indigo-300 animate-pulse-border"
                  : "bg-gray-100 border border-gray-200"
                : isPartnerNext
                ? "bg-white border-2 border-green-200"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-xs font-medium text-gray-500">
                {line.speaker}
              </p>
              <div className="flex items-center gap-1">
                {/* Partner line: show speaker button */}
                {!isMyLine && (
                  <SpeakButton text={line.text} tts={tts} />
                )}
                {/* My line revealed: show speaker button */}
                {isMyLine && isRevealed && (
                  <SpeakButton text={line.text} tts={tts} />
                )}
              </div>
            </div>

            {isMyLine && !isRevealed ? (
              <div className="space-y-2">
                <p className="text-gray-400 italic text-sm">
                  {isNext ? "마이크 버튼을 눌러 말하거나, 탭하여 대사를 확인하세요" : "..."}
                </p>
                {isNext && (
                  <div className="flex items-center gap-3">
                    <MicButton stt={stt} expected={line.text} />
                    {stt.transcript && (
                      <p className="text-xs text-gray-500 italic flex-1">
                        &ldquo;{stt.transcript}&rdquo;
                      </p>
                    )}
                    <button
                      onClick={() => revealLine(idx)}
                      className="text-xs px-2 py-1 rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-300 transition"
                    >
                      정답 보기
                    </button>
                  </div>
                )}
              </div>
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
function ShadowingMode({
  conv,
  tts,
}: {
  conv: ConversationSet;
  tts: ReturnType<typeof useTTS>;
}) {
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
    tts.stop();
  }, [tts]);

  // Auto-play current line
  const playAndAdvance = useCallback(() => {
    const line = conv.lines[currentIdx];
    tts.speak(line.text, () => {
      // After TTS finishes, wait a moment then advance
      setTimeout(() => {
        if (currentIdx < conv.lines.length - 1) {
          setCurrentIdx((prev) => prev + 1);
        }
      }, 1500); // 1.5s pause for shadowing
    });
  }, [currentIdx, conv.lines, tts]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          듣기 버튼으로 재생 후 따라 읽으세요
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
              className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-2"
            >
              <SpeakButton text={line.text} tts={tts} />
              <div className="flex-1">
                {line.speaker && (
                  <p className="text-xs font-medium text-gray-500 mb-0.5">
                    {line.speaker}
                  </p>
                )}
                <p className="text-gray-800 text-lg">{line.text}</p>
              </div>
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
              <div className="flex items-start gap-2">
                {idx === currentIdx && (
                  <SpeakButton text={line.text} tts={tts} size="md" />
                )}
                <div className="flex-1">
                  {line.speaker && (
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {line.speaker}
                    </p>
                  )}
                  <p
                    className={`${
                      idx === currentIdx
                        ? "text-xl text-gray-800"
                        : "text-gray-600"
                    }`}
                  >
                    {line.text}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {currentIdx < conv.lines.length - 1 ? (
            <div className="flex gap-2">
              <button
                onClick={playAndAdvance}
                className="flex-1 py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition shadow-md"
              >
                듣고 따라하기
              </button>
              <button
                onClick={advance}
                className="px-4 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition shadow-md"
              >
                다음
              </button>
            </div>
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
function QuizMode({ conv, tts }: { conv: ConversationSet; tts: ReturnType<typeof useTTS> }) {
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
          <div className="flex items-center justify-between mb-1">
            {line.speaker ? (
              <p className="text-xs font-medium text-gray-500">
                {line.speaker}
              </p>
            ) : <span />}
            <SpeakButton text={line.text} tts={tts} />
          </div>
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
