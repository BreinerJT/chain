import { GetServerSideProps } from 'next'

import { getServerAuthSession } from '@/server/auth'
import { DashboardShell } from '@/components/DashboardShell'
import { LinkDetails } from '@/components/LinkDetails'
import { Input } from '@/components/ui/input'
import { api } from '@/utils/api'
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { ScrollArea } from '@/components/ui/scroll-area'

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
			<div className='container mx-auto mt-6'>
				<div className='grid gap-6'>
					<Input
						placeholder='Search your link here'
						className='dark:bg-zinc-900'
						onChange={e => setValue(e.target.value)}
						value={value}
					/>
					{isLoading && (
						<div className='mt-8 flex flex-col items-center justify-center'>
							<p className='mb-4'>Loading links...</p>
							<Icons.loader className='mr-2 h-6 w-6 animate-spin' />
						</div>
					)}

					{links?.length === 0 && (
						<div className='flex flex-col items-center justify-center space-y-8'>
							<p className='text-2xl'>This is kind of empty.</p>
							<Icons.linkOff className='h-20 w-20' />
							<Link
								href='/dashboard/new'
								className={buttonVariants({
									variant: 'default'
								})}
							>
								<Icons.plus className=' mr-2 h-4 w-4' /> Add your first link
							</Link>
						</div>
					)}
					{links && (
						<div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
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
