import { useMemo, useState } from "react";
import Hangul from "hangul-js";

type UseComboInit = {
  options: ComboSelection[];
  selected?: ComboSelection | null;
  query?: string;
};

export interface ComboSelection {
  id: string;
  name: string;
}

export function useCombo(init: UseComboInit) {
  const [selected, setSelected] = useState<ComboSelection | null>(
    init.selected ?? null
  );
  const [query, setQuery] = useState<string>(init.query ?? "");

  const filteredOptions =
    query === ""
      ? init.options
      : init.options.filter((o) => Hangul.search(o.name, query) > -1);

  const comboBind = useMemo(
    () => ({
      selected,
      setSelected,
      query,
      setQuery,
      options: filteredOptions,
    }),
    [selected, query, filteredOptions]
  );

  return { selected, setSelected, query, setQuery, comboBind };
}
