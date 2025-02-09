import { Model, Models } from "@/sharedTypes/types";

import { useState } from "react";

function useDropdown() {
  const [selectedModel, setSelectedModel] = useState(Models.GPT_4O);

  const updateSelectedModel = (model: Model) => {
    setSelectedModel(model);
  };

  return { selectedModel, updateSelectedModel };
}

export default useDropdown;
