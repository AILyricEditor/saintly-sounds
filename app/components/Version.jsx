import clsx from 'clsx';

export default function Footer() {
  const update = true;

  return (
    <footer
      className={clsx(
        `flex flex-row items-center gap-0.5 absolute top-auto md:top-1
        md:bottom-auto bottom-1 right-1 z-2 p-2 text-[0.45em] md:text-[0.6em]
        letter-spacing-[3px] font-bold`,
        update ? 'text-green-500' : 'text-white'
      )}
    >
      <p>v0.6.0-alpha</p>
      {update && (
        <svg
          className={clsx('w-4 h-4 fill-green-500')}
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 -960 960 960'
          width='24px'
          fill='#e3e3e3'
        >
          <path d='m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z' />
        </svg>
      )}
    </footer>
  );
}
