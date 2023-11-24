import { GetServerSideProps } from 'next'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { z } from 'zod'

import { getServerAuthSession } from '@/server/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CreateLinkSchema } from '@/schemas/link.schema'
import { api } from '@/utils/api'
import { useToast } from '@/components/ui/use-toast'
import { DashboardShell } from '@/components/DashboardShell'
import { Icons } from '@/components/Icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type NewLinkForm = z.infer<typeof CreateLinkSchema>

export default function NewLinkPage() {
	const router = useRouter()
	const { toast } = useToast()
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors }
	} = useForm<NewLinkForm>({
		resolver: zodResolver(CreateLinkSchema)
	})
	const { mutate, isLoading } = api.link.create.useMutation({
		onSuccess: () => {
			router.push('/dashboard')
			toast({
				duration: 2000,
				title: 'Looks good!',
				description: 'Your link have been created successfully.'
			})
		},
		onError: () => {
			setError('slug', {
				type: 'manual',
				message: 'Looks like the slug already exist, try with another one.'
			})
		}
	})

	const onSubmit = (data: NewLinkForm) => {
		if (data.slug === data.url) {
			setError('slug', {
				message: 'Url and slug cannot be the same.',
				type: 'manual'
			})
			return
		}
		mutate(data)
	}

	const onGenerateRandomId = () => {
		const randomId = nanoid(6)
		setValue('slug', randomId)
	}

	return (
		<DashboardShell>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid gap-8 md:container md:mx-auto md:mt-4'
			>
				<div className='grid gap-4'>
					<Label htmlFor='url'>URL</Label>
					<Input
						placeholder='https://'
						className='dark:bg-zinc-900'
						id='url'
						{...register('url')}
					/>
					{errors.url && (
						<Alert variant='destructive'>
							<Icons.alertCircle className='h-4 w-4' />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{errors.url.message}</AlertDescription>
						</Alert>
					)}
				</div>
				<div className='grid gap-4'>
					<Label htmlFor='slug'>Custom slug</Label>
					<div className='flex items-center space-x-2'>
						<Input
							placeholder='Custom slug'
							className='dark:bg-zinc-900'
							id='slug'
							{...register('slug')}
						/>
						<Button
							type='button'
							variant='secondary'
							onClick={onGenerateRandomId}
							className='hidden md:flex'
						>
							Randomize
						</Button>
						<Button
							type='button'
							size='icon'
							variant='secondary'
							onClick={onGenerateRandomId}
							className='md:hidden'
						>
							<Icons.random />
						</Button>
					</div>
					{errors.slug && (
						<Alert variant='destructive'>
							<Icons.alertCircle className='h-4 w-4' />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{errors.slug.message}</AlertDescription>
						</Alert>
					)}
				</div>
				<div className='grid gap-4'>
					<Label htmlFor='description'>Description (Optional)</Label>
					<Textarea
						className='resize-none dark:bg-zinc-900'
						id='description'
						{...register('description')}
					/>
				</div>
				<div className='flex justify-end'>
					<Button disabled={isLoading} type='submit' variant='secondary'>
						Create new Link
					</Button>
				</div>
			</form>
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
