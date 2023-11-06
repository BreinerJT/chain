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

type NewLinkForm = z.infer<typeof CreateLinkSchema>

export default function NewLinkPage() {
	const router = useRouter()
	const { toast } = useToast()
	const { register, handleSubmit, setError, setValue } = useForm<NewLinkForm>({
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
				message: 'Slug already exist.'
			})
			toast({
				title: 'Oops!',
				description: 'Looks like the slug already exist, try with another one.',
				variant: 'destructive'
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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='container mx-auto mt-4 grid gap-8 px-4'
		>
			<div className='grid gap-4'>
				<Label htmlFor='url'>URL</Label>
				<Input
					placeholder='https://'
					className='dark:bg-zinc-900'
					id='url'
					{...register('url')}
				/>
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
					>
						Randomize
					</Button>
				</div>
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
				<Button disabled={isLoading} type='submit' variant='ghost'>
					Create new Link
				</Button>
			</div>
		</form>
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
