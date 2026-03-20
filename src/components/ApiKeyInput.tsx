"use client";

import { useState, useEffect } from "react";

interface Props {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export default function ApiKeyInput({ apiKey, onApiKeyChange }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tdea_api_key");
    if (stored) {
      onApiKeyChange(stored);
      setSaved(true);
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    if (inputValue.trim()) {
      localStorage.setItem("tdea_api_key", inputValue.trim());
      onApiKeyChange(inputValue.trim());
      setSaved(true);
      setEditing(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setInputValue("");
    setSaved(false);
  };

  const handleClear = () => {
    localStorage.removeItem("tdea_api_key");
    onApiKeyChange("");
    setInputValue("");
    setSaved(false);
    setEditing(false);
  };

  if (saved && !editing) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-medium text-sm">
              API 키 저장됨
            </span>
            <span className="text-gray-400 text-sm font-mono">
              {"•".repeat(20)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              변경
            </button>
            <button
              onClick={handleClear}
              className="text-sm text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Claude API 키 입력
      </label>
      <div className="flex gap-2">
        <input
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="sk-ant-..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSave}
          disabled={!inputValue.trim()}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          저장
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Anthropic API 키가 필요합니다.{" "}
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          키 발급받기
        </a>
      </p>
    </div>
  );
}
