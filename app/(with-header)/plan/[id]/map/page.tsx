import GoogleMap from '@/components/plan/google-map';
import PlanPlaceSearchBar from '@/components/searchbars/plan-place-searchbar';

export default function Page() {
  return (
    <div className="fixed inset-0 flex justify-center">
      <div className="relative h-full w-full max-w-[600px]">
        <PlanPlaceSearchBar />
        <GoogleMap className="h-full w-full" />
      </div>
    </div>
  );
}
