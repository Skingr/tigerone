export default function Dropdown({
    selectedModel,
    updateSelectedModel,
    models,
  }: {
    selectedModel: string;
    updateSelectedModel: (model: string) => void;
    models: { value: string; label: string }[];
  }) {
    return (
      <div className="absolute top-4 left-4 z-10">
        <select
          value={selectedModel}
          onChange={(e) => updateSelectedModel(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-cc-gold focus:border-transparent"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
    );
  }