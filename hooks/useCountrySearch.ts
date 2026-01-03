'use client';

import { useMemo, useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { City, countryTabs, countryDataMap, allCities } from '@/utils/countryData';

type UseCountrySearchOptions = {
  initialTab?: string;
  initialSelectedIds?: string[];
  allowMultiple?: boolean;
};

export function useCountrySearch(options?: UseCountrySearchOptions) {
  const { query, setQuery, reset: resetQuery, isSearching } = useSearch();
  const [activeTab, setActiveTab] = useState(options?.initialTab ?? 'all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(options?.initialSelectedIds ?? []));

  const allowMultiple = options?.allowMultiple ?? true;

  const baseCities: City[] = useMemo(() => {
    if (activeTab === 'all') return allCities;
    return countryDataMap[activeTab] ?? [];
  }, [activeTab]);

  const searchedCities: City[] = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();

    return baseCities.filter((city) => {
      return (
        city.name.toLowerCase().includes(q) ||
        ('en' in city && city.en.toLowerCase().includes(q)) ||
        ('country' in city && city.country.toLowerCase().includes(q))
      );
    });
  }, [query, baseCities]);

  const visibleCities: City[] = isSearching ? searchedCities : baseCities;

  const toggleCity = (cityId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (!allowMultiple) {
        next.clear();
        next.add(cityId);
        return next;
      }

      next.has(cityId) ? next.delete(cityId) : next.add(cityId);
      return next;
    });
  };

  const clearSelected = () => {
    setSelectedIds(new Set());
  };

  const isSelected = (cityId: string) => {
    return selectedIds.has(cityId);
  };

  const selectedCities: City[] = useMemo(() => {
    return Array.from(selectedIds)
      .map((id) => allCities.find((c) => c.id === id))
      .filter((c): c is City => Boolean(c));
  }, [selectedIds]);

  return {
    query,
    activeTab,
    selectedIds,
    tabs: countryTabs,
    visibleCities,
    selectedCities,
    isSearching,
    isSelected,
    setQuery,
    setActiveTab,
    toggleCity,
    clearSelected,
    resetQuery,
  };
}
