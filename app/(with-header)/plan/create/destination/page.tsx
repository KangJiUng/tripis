import CountryList from '@/components/country-list';
import PlanCreateHeader from '@/components/headers/plan-create-header';
import SubmitButton from '@/components/submit-button';

export default function Page() {
  return (
    <div>
      <PlanCreateHeader />
      <CountryList />
      <div className="fixed bottom-0 left-0 flex w-full justify-center bg-white">
        <SubmitButton />
      </div>
    </div>
  );
}
