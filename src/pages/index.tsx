import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { AppLayout } from '@/components/layouts/AppLayout'
import { api } from '@/utils/api'

export default function Home() {
	return (
		<AppLayout>
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
		</AppLayout>
	)
}

function AuthShowcase() {
	const { data: sessionData } = useSession()

	const { data: secretMessage } = api.post.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: sessionData?.user !== undefined }
	)

	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<p className='text-center text-2xl text-white'>
				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
				{secretMessage && <span> - {secretMessage}</span>}
			</p>
			<button
				className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
				onClick={sessionData ? () => void signOut() : () => void signIn()}
			>
				{sessionData ? 'Sign out' : 'Sign in'}
			</button>
		</div>
	)
}
