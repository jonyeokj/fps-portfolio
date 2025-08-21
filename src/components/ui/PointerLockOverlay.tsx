type PointerLockOverlayProps = {
  disabled?: boolean;
};

const PointerLockOverlay = ({ disabled = false }: PointerLockOverlayProps) => {
  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center bg-black/85 select-none pointer-events-none text-2xl ${
        disabled ? 'text-gray-500' : 'text-white'
      }`}
    >
      {disabled ? 'Please wait...' : 'Click to play'}
    </div>
  );
};

export default PointerLockOverlay;
