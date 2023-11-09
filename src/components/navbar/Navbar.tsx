import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { ModeToggle } from '@/components/ModeToggle'
import { Authentication } from '@/components/Authentication'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const Navbar = ({ className }: React.HTMLAttributes<HTMLElement>) => {
	return (
		<header
			className={cn('container top-0 z-40 mx-auto w-full py-4', className)}
		>
			<div className='container mx-auto flex select-none items-center justify-between pl-4 pr-4'>
				<Link href='/'>
					<div className='flex items-center'>
						<Icons.logo />
						<h2 className='ml-2 mr-2 font-heading text-xl'>
							{siteConfig.name}
						</h2>
					</div>
				</Link>
				<div className='flex items-center space-x-4'>
					<Authentication />
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
