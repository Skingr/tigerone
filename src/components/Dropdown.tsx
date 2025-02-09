"use client";
import useDropdown from "@/hooks/useDropdown";
import { Model } from "@/sharedTypes/types";

export default function Dropdown({
  selectedModel,
  updateSelectedModel,
  models,
}: {
  selectedModel: Model;
  updateSelectedModel: (model: Model) => void;
  models: { value: Model; label: string }[];
}) {
  return (
    <select
      value={selectedModel}
      onChange={(e) => updateSelectedModel(e.target.value as Model)}
      className="bg-white text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cc-gold focus:border-transparent font-geist-sans"
    >
      {models.map((model: { value: Model; label: string }) => (
        <option key={model.value} value={model.value}>
          {model.label}
        </option>
      ))}
    </select>
  );
}
