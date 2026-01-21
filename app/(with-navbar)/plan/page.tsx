'use client';

import { useRef, useEffect, useState } from 'react';
import PlanHeader from '@/components/headers/plan-header';
import GoogleMap from '@/components/plan/google-map';
import PlanDayList from '@/components/plan/plan-day-list';
import Link from 'next/link';
import { getTravelDays } from '@/utils/getTravelDays';
import { allCities } from '@/utils/countryData';

type Plan = {
  plan_id: string;
  title: string;
  country: string;
  start_date: string;
  end_date: string;
};

type MapPlace = {
  place_id: string;
  title: string;
  latitude: number;
  longitude: number;
  order_index: number;
};

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  const futurePlans = plans
    .filter((plan) => new Date(plan.start_date) >= new Date())
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

  const nearestPlan = futurePlans[0];
  const days = nearestPlan ? getTravelDays(nearestPlan.start_date, nearestPlan.end_date) : [];

  const mapCenter = (() => {
    if (!nearestPlan) return { lat: 35.681236, lng: 139.767125 }; // fallback

    const city = allCities.find((c) => c.id === nearestPlan.country);
    if (!city) return { lat: 35.681236, lng: 139.767125 };

    return { lat: city.lat, lng: city.lng };
  })();

  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [mapPlaces, setMapPlaces] = useState<MapPlace[]>([]);

  const [routeTrigger, setRouteTrigger] = useState(0);

  const refreshRouteForSelectedDay = async () => {
    if (!nearestPlan || selectedDayIndex === null) {
      setMapPlaces([]);
      return;
    }

    const res = await fetch(`/api/plans/${nearestPlan.plan_id}/days`);
    if (!res.ok) {
      setMapPlaces([]);
      return;
    }

    const data = await res.json();
    const day = data.days.find((d: any) => d.day_index === selectedDayIndex);

    setMapPlaces(day?.places ?? []);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/plans');
      if (!res.ok) return;

      const data = await res.json();
      setPlans(data.plans ?? []);
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (!nearestPlan || days.length === 0) return;

    setSelectedDayIndex(1);
  }, [nearestPlan]);

  useEffect(() => {
    refreshRouteForSelectedDay();
  }, [nearestPlan, selectedDayIndex, routeTrigger]);

  return (
    <div className="flex h-full flex-col">
      <PlanHeader
        tripName={nearestPlan?.title}
        tripDate={nearestPlan ? `${nearestPlan.start_date} - ${nearestPlan.end_date}` : undefined}
        scrollRootRef={scrollRef}
        titleRef={titleRef}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {nearestPlan ? (
          <>
            <div className="shrink-0 p-1">
              <h1 ref={titleRef} className="text-medium20">
                {nearestPlan.title}
              </h1>
              <p className="text-regular15 text-gray-500">
                {nearestPlan.start_date} - {nearestPlan.end_date}
              </p>
            </div>

            <div className="w-full py-2">
              <GoogleMap
                className="h-[200px] w-full"
                center={mapCenter}
                markers={mapPlaces.map((p) => ({
                  id: p.place_id,
                  lat: p.latitude,
                  lng: p.longitude,
                  title: p.title,
                  order: p.order_index,
                }))}
              />

              <PlanDayList
                days={days}
                planId={nearestPlan.plan_id}
                onViewRoute={(dayIndex) => {
                  setSelectedDayIndex(dayIndex);
                  setRouteTrigger((v) => v + 1);
                }}
                onRouteDataChanged={refreshRouteForSelectedDay}
              />
            </div>
          </>
        ) : (
          <div className="flex min-h-full flex-col items-center justify-center gap-3">
            <div className="text-regular15">등록된 일정이 없어요. 새 여행 계획을 세워보세요!</div>
            <Link href="/plan/create/destination" className="text-regular14 rounded-full border px-4 py-2">
              일정 등록하기
            </Link>
            <Link href="/plan/list" className="text-regular14 text-gray-400 underline">
              지난 일정 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
