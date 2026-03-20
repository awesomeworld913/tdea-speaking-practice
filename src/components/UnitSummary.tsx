"use client";

import { UnitData } from "@/lib/types";

interface Props {
  unit: UnitData;
}

export default function UnitSummary({ unit }: Props) {
  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 space-y-3">
      <h3 className="font-semibold text-blue-900">
        Level {unit.levelNumber} - Unit {unit.unitNumber}: {unit.unitTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-blue-800">토픽:</span>{" "}
          <span className="text-gray-700">{unit.unitTopic}</span>
        </div>
        <div>
          <span className="font-medium text-blue-800">CEFR:</span>{" "}
          <span className="text-gray-700">{unit.cefrLevel}</span>
        </div>
      </div>

      {unit.subtopics.length > 0 && (
        <div className="text-sm">
          <span className="font-medium text-blue-800">소재:</span>{" "}
          <span className="text-gray-700">{unit.subtopics.join(" / ")}</span>
        </div>
      )}

      <div className="text-sm">
        <span className="font-medium text-blue-800">학습목표:</span>{" "}
        <span className="text-gray-700">
          {unit.unitObjectiveKr || unit.unitObjectiveEn}
        </span>
      </div>

      {unit.unitWords.length > 0 && (
        <div className="text-sm">
          <span className="font-medium text-blue-800">단어:</span>{" "}
          <span className="text-gray-600 font-mono text-xs">
            {unit.unitWords.slice(0, 20).join(", ")}
            {unit.unitWords.length > 20 && ` ... (+${unit.unitWords.length - 20})`}
          </span>
        </div>
      )}

      {unit.expressions.length > 0 && (
        <div className="text-sm">
          <span className="font-medium text-blue-800">표현 패턴:</span>
          <div className="mt-1 space-y-1">
            {unit.expressions.map((expr, i) => (
              <div key={i} className="text-gray-600 text-xs pl-2 border-l-2 border-blue-200">
                <span className="font-medium">{expr.titleEn}</span>
                {expr.examples && (
                  <span className="text-gray-500 ml-1">
                    {expr.examples.substring(0, 80)}...
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {unit.grammar.length > 0 && (
        <div className="text-sm">
          <span className="font-medium text-blue-800">문법:</span>{" "}
          <span className="text-gray-600 text-xs">
            {unit.grammar.map((g) => g.substring(0, 50)).join(" / ")}
          </span>
        </div>
      )}
    </div>
  );
}
