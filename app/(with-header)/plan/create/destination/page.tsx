import CountryList from '@/components/country-list';
import PlanCreateHeader from '@/components/headers/plan-create-header';
import SubmitButton from '@/components/buttons/submit-button';

export default function Page() {
  return (
    <div>
      <PlanCreateHeader />
      <CountryList />
      <div className="fixed bottom-0 left-0 w-full bg-white">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}
