'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  onSelect: (countries: Country[]) => void;
  initialSelected: Country[];
}

export default function CountrySelectorModal({
  isOpen,
  onClose,
  onSelect,
  initialSelected,
}: CountrySelectorModalProps) {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const handleSelect = () => {
    if (selectedCountries.length === 0) return;

    onSelect(selectedCountries);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedCountries(initialSelected);
    }
  }, [isOpen, initialSelected]);

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center" onClick={handleClose}>
          <motion.div
            className="absolute inset-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full w-full max-w-[600px] bg-black/50" />
          </motion.div>

          <motion.div
            className="fixed inset-x-0 bottom-0 flex justify-center"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[80vh] w-full max-w-[600px] flex-col rounded-t-lg bg-white">
              <div className="flex items-center justify-between px-3 pt-3 pb-4">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
