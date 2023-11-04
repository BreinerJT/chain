import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center	pb-20 pt-20'>
			<h1 className='mb-2 text-3xl md:mb-5 md:text-6xl'>Chain</h1>
			<h3 className='mb-2 text-2xl text-gray-400'>
				Short URLs and custom slugs
			</h3>
			<h4 className='text-2xl text-gray-400'>Totally open source</h4>
			<div className='mt-6 flex items-center'>
				<Link href='/auth' className={buttonVariants({ variant: 'ghost' })}>
					Get started
				</Link>
				<a
					href='https://github.com/BreinerJT/chain'
					target='_blank'
					rel='noreferrer'
					className={buttonVariants({ variant: 'ghost' })}
				>
					<Icons.star className='mr-2 h-4 w-4' />
					Star on Github
				</a>
			</div>
		</div>
	)
}
