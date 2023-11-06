import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'

const NotFoundPage: NextPage = () => {
	const router = useRouter()
	const { message = 'Link not Found.' } = router.query

	return (
		<div className='container mx-auto mt-6 flex flex-col items-center justify-center space-y-8'>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				404 Not Found
			</h1>
			<Icons.linkOff className='h-20 w-20' />
			<h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
				{message}
			</h4>
			<Link
				href='/dashboard/new'
				className={buttonVariants({
					variant: 'ghost'
				})}
			>
				<Icons.plus className=' mr-2 h-4 w-4' /> Create new link
			</Link>
		</div>
	)
}

export default NotFoundPage
