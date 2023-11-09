import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { DashboardShell } from '@/components/DashboardShell'
import { Input } from '@/components/ui/input'
import { LinkDetails } from '@/components/LinkDetails'
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/utils/api'
import { getServerAuthSession } from '@/server/auth'
import { LinkDetailsSkeleton } from '@/components/LinkDetailsSkeleton'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
	const [value, setValue] = useState('')
	const debouncedFilter = useDebounce(value, 500)

	const {
		data: links,
		error,
		isLoading
	} = api.link.getAll.useQuery({ filter: debouncedFilter })

	if (error) {
		return (
			<Alert variant='destructive' className='mx-auto w-[350px]'>
				<Icons.alertCircle className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error.message}</AlertDescription>
			</Alert>
		)
	}

	return (
		<DashboardShell>
			<div className='md:container md:mx-auto'>
				<div className='grid gap-4 pb-4'>
					<div className='flex- col	flex items-center space-x-2 border-b-2 border-foreground pb-4 md:flex-row md:space-x-6'>
						<Input
							placeholder='Search your link here'
							onChange={e => setValue(e.target.value)}
							value={value}
						/>
						<div className='hidden md:block'>
							<Link
								href='/dashboard/new'
								className={cn(
									buttonVariants({
										variant: 'secondary'
									})
								)}
							>
								<Icons.plus className='mr-2 h-4 w-4' /> Create new link
							</Link>
						</div>
						<div className='md:hidden'>
							<Link
								href='/dashboard/new'
								className={cn(
									buttonVariants({
										variant: 'secondary',
										size: 'icon'
									})
								)}
							>
								<Icons.plus className='h-4 w-4' />
							</Link>
						</div>
					</div>

					{isLoading && (
						<div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
							{Array.from({ length: 6 }).map((_, i) => (
								<LinkDetailsSkeleton key={i} />
							))}
						</div>
					)}

					{links?.length === 0 && (
						<div className='mt-5 flex flex-col items-center justify-center space-y-4 md:space-y-8'>
							<p className='text-center font-heading text-4xl'>
								This is kind of empty.
							</p>
							<Icons.linkOff className='h-20 w-20' />
							<Link
								href='/dashboard/new'
								className={buttonVariants({
									variant: 'default'
								})}
							>
								<Icons.plus className=' mr-2 h-4 w-4' /> Add a new link
							</Link>
						</div>
					)}

					{links && (
						<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
							{links.map(link => (
								<LinkDetails
									key={link.id}
									id={link.id}
									description={link.description || 'No description.'}
									slug={link.slug}
									url={link.url}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</DashboardShell>
	)
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const session = await getServerAuthSession(ctx)

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}
