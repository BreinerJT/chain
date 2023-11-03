import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'

export const Navbar = () => {
	return (
		<header className='sticky top-0 z-40 w-full py-4'>
			<div className='container mx-auto flex items-center justify-between pl-4 pr-4'>
				<Link href='/'>
					<div className='flex items-center transition-colors duration-300 hover:text-gray-300'>
						<Icons.logo />
						<h2 className='ml-2 mr-2 text-xl'>Chain</h2>
					</div>
				</Link>
				<div className='flex items-center space-x-6'>
					<Link href='/auth' className={buttonVariants({ variant: 'ghost' })}>
						Login
					</Link>
				</div>
			</div>
		</header>
	)
}
