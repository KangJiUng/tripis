import MapIcon from '../icons/map-icon';
import MenuIcon from '../icons/menu-icon';

export default function PlanHeader() {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="w-10" />
        <div className="text-medium18">일정</div>
        <div className="flex items-center gap-4">
          <MapIcon />
          <MenuIcon />
        </div>
      </header>
      <div className="h-12" />
    </>
  );
}
