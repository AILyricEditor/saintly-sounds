'use client';

import clsx from 'clsx';
import Image from 'next/image';

export default function SongCover({ size = 75, song, children, style, className = '', onClick = () => {} }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
				'relative aspect-square rounded-lg overflow-hidden flex items-center content-center transition-all',
				'SongCover', 
				className)}
      style={{ ...style, width: size, height: size }}
    >
      <Image src={song.image} alt={song.title} fill className={clsx(
				'h-full rounded-[inherit] object-cover', 
			)} />
			<div className='absolute inset-0 z-10 flex items-center justify-center pointer-events-auto'>
      	{children}
			</div>
    </div>
  );
}
