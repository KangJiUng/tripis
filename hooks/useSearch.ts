'use client';

import { useState } from 'react';

type UseSearchOptions = {
  initialValue?: string;
};

export function useSearch(options?: UseSearchOptions) {
  const [query, setQuery] = useState(options?.initialValue ?? '');

  const onChange = (value: string) => {
    setQuery(value);
  };

  const reset = () => {
    setQuery('');
  };

  return {
    query,
    setQuery: onChange,
    reset,
    isSearching: query.trim().length > 0,
  };
}
