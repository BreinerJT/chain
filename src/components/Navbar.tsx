import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { ModeToggle } from '@/components/ModeToggle'
import { Authentication } from '@/components/Authentication'
import { siteConfig } from '@/config/site'

export const Navbar = () => {
	return (
		<header className='top-0 z-40 w-full py-4'>
			<div className='container mx-auto flex select-none items-center justify-between pl-4 pr-4'>
				<Link href='/'>
					<div className='flex items-center'>
						<Icons.logo />
						<h2 className='font-heading ml-2 mr-2 text-xl'>
							{siteConfig.name}
						</h2>
					</div>
				</Link>
				<div className='flex items-center space-x-6'>
					<Authentication />
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
