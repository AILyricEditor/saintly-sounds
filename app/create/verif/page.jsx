import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

export default function Example() {
  return (
		<main>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-auto bg-[var(--secondary)] p-6 rounded shadow-lg">
				<Field>
					<Label className="text-sm leading-6 font-medium text-white">Creator Verification</Label>
					<Description className="text-sm leading-6 text-white/50">
						A password is required to enter Studio
					</Description>
					<Input className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-2 text-sm leading-6 text-white" />
				</Field>
			</div>
		</main>
  )
}