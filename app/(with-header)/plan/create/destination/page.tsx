import PlanCreateHeader from '@/components/headers/plan-create-header';
import PlanCountrySearchBar from '@/components/searchbars/plan-country-searchbar';
import SubmitButton from '@/components/submit-button';

export default function Page() {
  return (
    <div>
      <PlanCreateHeader />
      <PlanCountrySearchBar />
      <div className="overflow-x-auto">
        <div className="flex gap-2 py-2.5 whitespace-nowrap">
          <button className="text-medium12 rounded-[17px] border px-3 py-2">국내</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">일본</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">동남아시아</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">남태평양</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">유럽</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">미주</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">중남미</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">서아시아</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">중화/중국</button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full justify-center">
        <SubmitButton />
      </div>
    </div>
  );
}
