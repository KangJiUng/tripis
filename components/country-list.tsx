'use client';

import { useState } from 'react';
import locations from '@/data/locations.json';
import PlanCountrySearchBar from './searchbars/plan-country-searchbar';
import CloseIcon from '@/icons/close-icon';

type BaseCity = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type OverseasCity = BaseCity & {
  en: string;
  country: string;
};

type City = BaseCity | OverseasCity;

const countryTabs = [
  { key: 'all', label: '전체' },
  { key: 'japan', label: '일본' },
  { key: 'southeast_asia', label: '동남아시아' },
  { key: 'south_pacific', label: '남태평양' },
  { key: 'europe', label: '유럽' },
  { key: 'americas', label: '미주' },
  { key: 'latin_america', label: '중남미' },
  { key: 'west_asia', label: '서아시아' },
  { key: 'greater_china', label: '중화/중국' },
  { key: 'domestic', label: '국내' },
];

const countryDataMap: Record<string, City[]> = {
  japan: locations.overseas.japan,
  southeast_asia: locations.overseas.southeast_asia,
  south_pacific: locations.overseas.south_pacific,
  europe: locations.europe,
  americas: locations.americas,
  latin_america: locations.latin_america,
  west_asia: locations.west_asia,
  greater_china: locations.greater_china,
  domestic: locations.domestic,
};

export default function CountryList() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());

  const toggleCity = (cityId: string) => {
    setSelectedCities((prev) => {
      const next = new Set(prev);
      if (next.has(cityId)) {
        next.delete(cityId);
      } else {
        next.add(cityId);
      }
      return next;
    });
  };

  const selectedCityList: City[] = Array.from(selectedCities)
    .map((cityId) =>
      Object.values(countryDataMap)
        .flat()
        .find((c) => c.id === cityId),
    )
    .filter((c): c is City => Boolean(c));

  const visibleCountryKeys = activeTab === 'all' ? Object.keys(countryDataMap) : [activeTab];

  return (
    <div>
      <PlanCountrySearchBar />
      <div className="overflow-x-auto">
        <div className="flex gap-2 px-1 py-2.5 whitespace-nowrap">
          {countryTabs.map((tab) => (
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
        </div>
      </div>
      <div className="mt-3 space-y-6">
        {visibleCountryKeys.map((countryKey) => {
          const list = countryDataMap[countryKey];
          if (!list || list.length === 0) return null;

          const countryLabel = countryTabs.find((t) => t.key === countryKey)?.label ?? '';

          return (
            <div key={countryKey}>
              <div className="text-bold14 mb-2 px-2">{countryLabel}</div>

              <ul className="flex flex-col gap-2">
                {list.map((city) => {
                  const isSelected = selectedCities.has(city.id);

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
                            isSelected ? 'border border-[#5364FF] bg-white text-[#5364FF]' : 'bg-[#eeeeee] text-[#000]'
                          }`}
                        >
                          {isSelected ? '취소' : '선택'}
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
      {selectedCityList.length > 0 && (
        <div className="fixed bottom-12 left-0 z-40 flex w-full justify-center">
          <div className="w-full max-w-[600px] bg-[#f1f2ff]">
            <div className="flex max-w-[390px] gap-1 overflow-x-auto px-2 pt-4 pb-2">
              {selectedCityList.map((city) => (
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
