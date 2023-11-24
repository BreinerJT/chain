import { useState } from 'react'
import { GetServerSideProps } from 'next'

import { signIn } from 'next-auth/react'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { getServerAuthSession } from '@/server/auth'

export default function Auth() {
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)
	const [isGitHubLoading, setIsGitHubLoading] = useState(false)

	return (
		<div className='lg:p-8'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='font-mono text-2xl font-semibold tracking-wide'>
						Welcome back
					</h1>
				</div>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t' />
					</div>
					<div className='relative flex justify-center text-xs uppercase'>
						<span className='bg-background px-2 text-muted-foreground'>
							Continue with
						</span>
					</div>
				</div>
				<div>
					<Button
						type='button'
						disabled={isGoogleLoading || isGitHubLoading}
						variant='ghost'
						onClick={() => {
							setIsGoogleLoading(true)
							signIn('google')
						}}
					>
						{isGoogleLoading ? (
							<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
						) : (
							<Icons.google className='mr-2 h-4 w-4' />
						)}{' '}
						Gmail
					</Button>
					<Button
						type='button'
						disabled={isGitHubLoading || isGoogleLoading}
						variant='ghost'
						onClick={() => {
							setIsGitHubLoading(true)
							signIn('github')
						}}
					>
						{isGitHubLoading ? (
							<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
						) : (
							<Icons.gitHub className='mr-2 h-4 w-4' />
						)}{' '}
						Github
					</Button>
				</div>
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
