"use client";

import { UnitSelectorItem } from "@/lib/types";

interface Props {
  units: UnitSelectorItem[];
  selectedLevel: number | null;
  selectedUnitId: string | null;
  onLevelChange: (level: number | null) => void;
  onUnitChange: (unitId: string | null) => void;
}

const LEVEL_LABELS: Record<number, string> = {
  0: "Level 0 (Pre-A1)",
  1: "Level 1 (A1)",
  2: "Level 2 (A1)",
  3: "Level 3 (A2)",
  4: "Level 4 (A2)",
};

export default function LevelUnitSelector({
  units,
  selectedLevel,
  selectedUnitId,
  onLevelChange,
  onUnitChange,
}: Props) {
  const levels = [...new Set(units.map((u) => u.levelNumber))].sort(
    (a, b) => a - b
  );

  const filteredUnits =
    selectedLevel !== null
      ? units.filter((u) => u.levelNumber === selectedLevel)
      : [];

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "") {
      onLevelChange(null);
      onUnitChange(null);
    } else {
      onLevelChange(parseInt(val, 10));
      onUnitChange(null);
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onUnitChange(val === "" ? null : val);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          레벨 선택
        </label>
        <select
          value={selectedLevel !== null ? selectedLevel.toString() : ""}
          onChange={handleLevelChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- 레벨을 선택하세요 --</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {LEVEL_LABELS[level] || `Level ${level}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          유닛 선택
        </label>
        <select
          value={selectedUnitId || ""}
          onChange={handleUnitChange}
          disabled={selectedLevel === null}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">-- 유닛을 선택하세요 --</option>
          {filteredUnits.map((unit) => (
            <option key={unit.unitId} value={unit.unitId}>
              Unit {unit.unitNumber} - {unit.unitTitle} ({unit.unitTopic})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
