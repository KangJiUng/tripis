'use client';

import { useRouter } from 'next/navigation';
import CountryList from '@/components/country-list';
import PlanCreateHeader from '@/components/headers/plan-create-header';
import SubmitButton from '@/components/buttons/submit-button';
import { useState } from 'react';

type Country = {
  id: string;
  name: string;
};

export default function Page() {
  const router = useRouter();
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const handleNext = () => {
    if (selectedCountries.length === 0) return;

    const country = selectedCountries[0];

    router.push(`/plan/create/date?country=${country.id}`);
  };

  return (
    <div>
      <PlanCreateHeader />

      <CountryList onChangeSelected={(countries: Country[]) => setSelectedCountries(countries)} />

      <div className="fixed bottom-0 left-0 w-full bg-white">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton text="선택 완료" disabled={selectedCountries.length === 0} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
