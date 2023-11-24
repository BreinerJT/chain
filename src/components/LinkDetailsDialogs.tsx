import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
	DialogHeader,
	DialogFooter,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from '@/interfaces/link'
import { CreateLinkSchema } from '@/schemas/link.schema'
import { api } from '@/utils/api'
import { copyToClipboard } from '@/utils/copyToClipboard'

export const ShareDialog = ({ slug }: { slug: string }) => {
	const { toast } = useToast()

	const onCopyToClipboard = async () => {
		await copyToClipboard(`${window.location.origin}/r/${slug}`)
		toast({
			duration: 2000,
			description: 'Link successfully copied.'
		})
	}

	return (
		<DialogContent className='max-w-[300px] sm:max-w-md'>
			<DialogHeader>
				<DialogTitle>Share link</DialogTitle>
				<DialogDescription>
					Anyone who has this link will be able to join your site.
				</DialogDescription>
			</DialogHeader>
			<div className='flex items-center space-x-2'>
				<div className='grid flex-1 gap-2'>
					<Label htmlFor='link' className='sr-only'>
						Link
					</Label>
					<Input
						id='link'
						defaultValue={`${window.location.origin}/r/${slug}`}
						readOnly
					/>
				</div>
				<Button
					type='submit'
					size='sm'
					className='hidden px-3 sm:flex'
					onClick={onCopyToClipboard}
				>
					<span className='sr-only'>Copy</span>
					<Icons.copy className='h-4 w-4' />
				</Button>
			</div>
			<Button type='submit' className='sm:hidden' onClick={onCopyToClipboard}>
				Copy link
			</Button>
			<DialogFooter>
				<DialogClose asChild>
					<Button type='button' variant='secondary'>
						Close
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}

export const DeleteDialog = ({ slug, id }: { slug: string; id: number }) => {
	const { toast } = useToast()
	const utils = api.useUtils()

	const { mutate } = api.link.delete.useMutation({
		onSuccess: data => {
			utils.link.invalidate()
			toast({
				duration: 2000,
				title: 'Success',
				description: `${data.slug} have been deleted.`
			})
		},
		onError: () => {
			toast({
				duration: 2000,
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.'
			})
		}
	})

	return (
		<DialogContent className='max-w-[300px] sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>
					Do you want to delete <code>/r/{slug}</code>?
				</DialogTitle>
				<DialogDescription>This action cannot be undone.</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button
					className='mt-2 sm:mt-0'
					onClick={() => mutate({ id })}
					type='button'
				>
					Confirm
				</Button>
				<DialogClose asChild>
					<Button type='button' variant='secondary'>
						Close
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}

type EditLinkForm = z.infer<typeof CreateLinkSchema>
interface EditDialogProps {
	description: Link['description']
	id: Link['id']
	slug: Link['slug']
	url: Link['url']
	closeModal: () => void
}

export const EditDialog = ({
	description,
	id,
	slug,
	url,
	closeModal
}: EditDialogProps) => {
	const { handleSubmit, register, setError, setValue } = useForm<EditLinkForm>({
		defaultValues: {
			description,
			slug,
			url
		},
		resolver: zodResolver(CreateLinkSchema)
	})
	const { toast } = useToast()
	const utils = api.useUtils()

	const { mutate } = api.link.update.useMutation({
		onSuccess: () => {
			utils.link.invalidate()
			toast({
				duration: 2000,
				title: 'Looks good!',
				description: `Your changes have been saved.`
			})
		},
		onError: () => {
			toast({
				duration: 2000,
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.'
			})
		}
	})

	const onGenerateRandomId = () => {
		const randomId = nanoid(6)
		setValue('slug', randomId)
	}

	const onSubmit = (data: EditLinkForm) => {
		if (data.slug === data.url) {
			setError('slug', {
				message: 'Url and slug cannot be the same.',
				type: 'manual'
			})
			return
		}

		closeModal()

		mutate({
			...data,
			id
		})
	}

	return (
		<DialogContent className='max-w-[300px] sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>Edit /r/{slug}</DialogTitle>
				<DialogDescription>
					Make changes to your link here. Click save when you&rsquo;re done.
				</DialogDescription>
			</DialogHeader>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-4 grid gap-8 sm:container sm:mx-auto sm:px-4'
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
							className='hidden sm:flex'
						>
							Randomize
						</Button>
						<Button
							type='button'
							size='icon'
							variant='secondary'
							onClick={onGenerateRandomId}
							className='sm:hidden'
						>
							<Icons.random />
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
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	)
}
