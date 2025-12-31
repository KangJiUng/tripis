import PlanCreateHeader from '@/components/headers/plan-create-header';
import PlanCountrySearchBar from '@/components/searchbars/plan-country-searchbar';
import SubmitButton from '@/components/submit-button';
import locations from '@/data/locations.json';

export default function Page() {
  return (
    <div>
      <PlanCreateHeader />
      <PlanCountrySearchBar />
      <div className="overflow-x-auto">
        <div className="flex gap-2 py-2.5 whitespace-nowrap">
          <button className="text-medium12 rounded-[17px] border px-3 py-2">일본</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">동남아시아</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">남태평양</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">유럽</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">미주</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">중남미</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">서아시아</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">중화/중국</button>
          <button className="text-medium12 rounded-[17px] border px-3 py-2">국내</button>
        </div>
      </div>

      {/* 나라별 리스트업 */}
      <div className="mt-3 space-y-6">
        <div>
          <div className="text-bold14 mb-2 px-2">일본</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.overseas.japan.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">동남아시아</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.overseas.southeast_asia.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">남태평양</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.overseas.south_pacific.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">유럽</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.europe.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">미주</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.americas.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">중남미</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.latin_america.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">서아시아</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.west_asia.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">중화/중국</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.greater_china.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-bold14 mb-2 px-2">국내</div>
          <ul className="flex flex-col flex-wrap gap-2">
            {locations.domestic.map((loc) => (
              <li key={loc.id} className="px-2 py-1">
                <div className="flex items-center justify-between">
                  <div className="text-regular15 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300" />
                    <span>{loc.name}</span>
                  </div>
                  <button className="text-medium13 ml-4 cursor-pointer rounded-[17px] bg-[#eeeeee] px-3 py-1.25">
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex w-full justify-center">
        <SubmitButton />
      </div>
    </div>
  );
}
