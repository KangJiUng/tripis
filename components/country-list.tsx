'use client';

import PlanCountrySearchBar from './searchbars/plan-country-searchbar';
import CloseIcon from '@/icons/close-icon';
import HorizontalScroll from './horizontal-scroll';
import { useCountrySearch } from '@/hooks/useCountrySearch';
import { useEffect } from 'react';

type City = {
  id: string;
  name: string;
};

interface Props {
  onChangeSelected?: (cities: City[]) => void;
}

export default function CountryList({ onChangeSelected }: Props) {
  const {
    query,
    activeTab,
    selectedCities,
    isSearching,
    tabs,
    visibleCities,
    isSelected,
    setQuery,
    setActiveTab,
    toggleCity,
  } = useCountrySearch();

  useEffect(() => {
    onChangeSelected?.(selectedCities);
  }, [selectedCities, onChangeSelected]);

  return (
    <div>
      <PlanCountrySearchBar value={query} onChange={setQuery} />

      <HorizontalScroll className="gap-2 px-1 py-2.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-medium12 cursor-pointer rounded-[17px] border px-3 py-2 transition-colors ${
              activeTab === tab.key
                ? 'border-[#5364FF] bg-[#5364FF] text-white'
                : 'border-[#e0e0e0] bg-white text-[#222]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </HorizontalScroll>

      <div className="mt-3 space-y-6">
        {isSearching ? (
          <div>
            <div className="text-bold14 mb-2 px-2">검색 결과</div>

            <ul className="flex flex-col gap-2">
              {visibleCities.map((city) => {
                const selected = isSelected(city.id);

                return (
                  <li key={city.id} className="px-2 py-1">
                    <div className="flex items-center justify-between">
                      <div className="text-medium14 flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-gray-300" />
                        <span>{city.name}</span>
                      </div>

                      <button
                        onClick={() => toggleCity(city.id)}
                        className={`text-medium12 cursor-pointer rounded-[17px] px-3 py-1.25 ${
                          selected ? 'border border-[#5364FF] bg-white text-[#5364FF]' : 'bg-[#eeeeee] text-[#000]'
                        }`}
                      >
                        {selected ? '취소' : '선택'}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            {tabs
              .filter((t) => t.key !== 'all')
              .filter((t) => activeTab === 'all' || t.key === activeTab)
              .map((tab) => {
                const list = visibleCities;

                if (list.length === 0) return null;

                return (
                  <div key={tab.key}>
                    <div className="text-bold14 mb-2 px-2">{tab.label}</div>

                    <ul className="flex flex-col gap-2">
                      {list.map((city) => {
                        const selected = isSelected(city.id);

                        return (
                          <li key={city.id} className="px-2 py-1">
                            <div className="flex items-center justify-between">
                              <div className="text-medium14 flex items-center gap-3">
                                <div className="h-11 w-11 rounded-full bg-gray-300" />
                                <span>{city.name}</span>
                              </div>

                              <button
                                onClick={() => toggleCity(city.id)}
                                className={`text-medium12 cursor-pointer rounded-[17px] px-3 py-1.25 ${
                                  selected
                                    ? 'border border-[#5364FF] bg-white text-[#5364FF]'
                                    : 'bg-[#eeeeee] text-[#000]'
                                }`}
                              >
                                {selected ? '취소' : '선택'}
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {selectedCities.length > 0 && (
        <div className="fixed bottom-12 left-0 z-40 flex w-full justify-center">
          <div className="w-full max-w-[600px] bg-[#f1f2ff]">
            <div className="flex max-w-[390px] gap-1 overflow-x-auto px-2 pt-4 pb-2">
              {selectedCities.map((city) => (
                <div key={city.id} className="relative flex min-w-16 flex-col items-center">
                  <div className="relative flex h-11 w-11 items-center justify-center">
                    <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-300">
                      <div className="h-full w-full bg-gray-300" />
                    </div>
                    <button
                      onClick={() => toggleCity(city.id)}
                      className="absolute -top-1 -right-1 z-50 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <span className="text-medium13 mt-1 text-gray-700">{city.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
