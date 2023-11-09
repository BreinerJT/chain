import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { OpenSource } from '@/components/OpenSource'
import { Footer } from '@/components/ui/Footer'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default function Home() {
	return (
		<>
			<div className='container mx-auto flex max-w-[64rem] flex-col items-center gap-4 pb-20 pt-20 text-center'>
				<h1 className='font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
					{siteConfig.description}
				</h1>
				<div className='hidden font-heading md:block'>
					<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						From
					</h3>
					<small className='font-sans text-sm font-medium leading-none tracking-wider opacity-80'>
						https://www.thisIsAnIncrediblyLongAndComplicatedUrl.com
					</small>
					<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						To
					</h3>
					<small className='font-sans text-sm font-medium leading-none tracking-wider opacity-80'>
						{siteConfig.url}/r/EasySlug
					</small>
				</div>
				<div className='mt-6 flex flex-col justify-center space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
					<Link href='/auth' className={cn(buttonVariants({ size: 'lg' }))}>
						Get Started
					</Link>
					<Link
						href={siteConfig.links.github}
						target='_blank'
						rel='noreferrer'
						className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
					>
						GitHub
					</Link>
				</div>
			</div>
			<OpenSource />
			<Footer />
		</>
	)
}
