import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const OpenSource = ({
	className
}: React.HTMLAttributes<HTMLElement>) => {
	return (
		<section
			className={cn(
				'container mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 py-8 text-center md:py-12 lg:py-24',
				className
			)}
		>
			<h4 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
				Proudly Open Source
			</h4>
			<p className='text-sm capitalize leading-loose'>
				{siteConfig.name} is open source and powered by open source software.
				<br />
				The code is available on{' '}
				<Link
					href={siteConfig.links.github}
					target='_blank'
					rel='noreferrer'
					className='font-medium underline underline-offset-4'
				>
					GitHub
				</Link>
				.
			</p>
		</section>
	)
}
