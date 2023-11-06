import { GetServerSideProps } from 'next'
import { signIn } from 'next-auth/react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { getServerAuthSession } from '@/server/auth'

export default function Auth() {
	return (
		<div className='container mx-auto'>
			<div className='mt-16 grid items-center justify-center gap-8 px-4'>
				<Button
					variant='ghost'
					onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
				>
					<Icons.gmail className='mr-2 h-5 w-5' /> Sign in with Gmail
				</Button>
				<Button
					variant='ghost'
					onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
				>
					<Icons.github className='mr-2 h-5 w-5' /> Sign in with Github
				</Button>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const session = await getServerAuthSession(ctx)

	if (session) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}
