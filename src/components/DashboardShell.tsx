import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { Icons } from './Icons'

interface Props {
	children: React.ReactNode
}

export const DashboardShell = ({ children }: Props) => {
	return (
		<>
			<div className='border-b-2 border-zinc-800'>
				<div className='container mx-auto flex items-center justify-between pb-3 pl-4 pr-4'>
					<h1 className='text-2xl'>Dashboard</h1>
					<Link
						href='/dashboard/new'
						className={buttonVariants({
							variant: 'ghost',
							className: 'text-base'
						})}
					>
						<Icons.plus className=' mr-2 h-4 w-4' /> Create new link
					</Link>
				</div>
			</div>
			<div className='container mx-auto pl-4 pr-4'>{children}</div>
		</>
	)
}
