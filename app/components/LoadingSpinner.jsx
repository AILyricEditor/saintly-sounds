import clsx from 'clsx';

export default function LoadingSpinner({ size = 50 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={clsx(
        'absolute',
        'top-1/2',
        'left-1/2',
        'z-50',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'animate-spin',
        'rounded-full',
        'border-4',
        'border-transparent',
        'border-t-blue-500'
      )}
    ></div>
  );
}
