import DetailHeader from '@/components/headers/detail-header';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <DetailHeader />
      review {`${id}번 페이지`}
    </div>
  );
}
