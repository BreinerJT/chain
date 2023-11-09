import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from '../Icons'
import { siteConfig } from '@/config/site'
import { Authentication } from '../Authentication'
import { ModeToggle } from '../ModeToggle'

export const MobileNavbar = ({
	className
}: React.HTMLAttributes<HTMLElement>) => {
	return (
		<header className={cn('top-0 z-40 w-full p-4', className)}>
			<div className='flex items-center justify-between'>
				<Link href='/'>
					<div className='flex items-center'>
						<Icons.logo />
						<h2 className='ml-2 mr-2 font-heading text-xl'>
							{siteConfig.name}
						</h2>
					</div>
				</Link>
				<div className='flex items-center'>
					<Authentication />
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
