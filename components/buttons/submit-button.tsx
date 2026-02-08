interface SubmitButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  allowClickWhenDisabled?: boolean;
}

export default function SubmitButton({
  text = '작성 완료',
  disabled = false,
  onClick,
  type = 'button',
  allowClickWhenDisabled = false,
}: SubmitButtonProps) {
  const isBlocked = disabled && !allowClickWhenDisabled;

  return (
    <button
      type={type}
      disabled={isBlocked}
      aria-disabled={disabled}
      onClick={onClick}
      className={`text-regular14 h-12 w-full cursor-pointer transition ${disabled ? 'bg-gray-300 text-white' : 'bg-[#5364FF] text-white'} `}
    >
      {text}
    </button>
  );
}
