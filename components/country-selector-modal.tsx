'use client';

import { useState } from 'react';
import CountryList from '@/components/country-list';
import SubmitButton from '@/components/buttons/submit-button';
import CloseIcon from '@/icons/close-icon';

type Country = {
  id: string;
  name: string;
};

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

export default function CountrySelectorModal({ isOpen, onClose, onSelect }: CountrySelectorModalProps) {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const handleSelect = () => {
    if (selectedCountries.length === 0) return;

    const country = selectedCountries[0];
    onSelect(country);
    onClose();
    setSelectedCountries([]);
  };

  const handleClose = () => {
    onClose();
    setSelectedCountries([]);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 bg-black" onClick={handleClose}>
      <div className="fixed inset-x-0 bottom-0 flex justify-center">
        <div
          className="flex h-[80vh] w-full max-w-[600px] flex-col rounded-t-lg bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-gray-200 px-3 pt-3 pb-4">
            <h2 className="text-medium16 mt-1 ml-1">나라 선택</h2>
            <button className="cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            <CountryList onChangeSelected={(countries: Country[]) => setSelectedCountries(countries)} />
          </div>
          <SubmitButton text="선택 완료" disabled={selectedCountries.length === 0} onClick={handleSelect} />
        </div>
      </div>
    </div>
  );
}
