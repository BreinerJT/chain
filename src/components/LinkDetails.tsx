import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { api } from '@/utils/api'
import { copyToClipboard } from '@/utils/copyToClipboard'

interface Props {
	url: string
	slug: string
	description: string
	id: number
}

export const LinkDetails: React.FC<Props> = ({
	description,
	slug,
	url,
	id
}) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	return (
		<Card className='flex justify-between p-4 dark:bg-zinc-900'>
			<div className='truncate'>
				<CardHeader>
					<CardTitle>
						<a href=''>{`/r/${slug}`}</a>
					</CardTitle>
					<CardDescription>{url}</CardDescription>
				</CardHeader>
				<CardContent>{description}</CardContent>
			</div>
			<div className='py-6'>
				<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
					<Dialog
						open={isDeleteDialogOpen}
						onOpenChange={setIsDeleteDialogOpen}
					>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='sm'>
									<Icons.moreVertical className='h-4 w-4' />
									<span className='sr-only'>Link options</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='dark:bg-[#121212]'>
								<DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
									<Icons.share className='mr-2 h-4 w-4' />
									<span>Share</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icons.edit className='mr-2 h-4 w-4' />
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
									<Icons.trash className='mr-2 h-4 w-4' />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<DeleteDialog slug={slug} id={id} />
					</Dialog>
					<ShareDialog slug={slug} />
				</Dialog>
			</div>
		</Card>
	)
}

const ShareDialog = ({ slug }: { slug: string }) => {
	const { toast } = useToast()

	const onCopyToClipboard = async () => {
		await copyToClipboard(`${window.location.origin}/r/${slug}`)
		toast({
			duration: 2000,
			description: 'Link successfully copied.'
		})
	}

	return (
		<DialogContent className='sm:max-w-md'>
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
					className='px-3'
					onClick={onCopyToClipboard}
				>
					<span className='sr-only'>Copy</span>
					<Icons.copy className='h-4 w-4' />
				</Button>
			</div>
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

const DeleteDialog = ({ slug, id }: { slug: string; id: number }) => {
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
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					Do you want to delete <code>/r/{slug}</code>?
				</DialogTitle>
				<DialogDescription>This action cannot be undone.</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button onClick={() => mutate({ id })} type='button'>
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
