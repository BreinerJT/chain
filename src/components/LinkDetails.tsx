import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Icons } from '@/components/Icons'
import {
	DeleteDialog,
	EditDialog,
	ShareDialog
} from '@/components/LinkDetailsDialogs'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Link } from '@/interfaces/link'

export const LinkDetails = ({ description, slug, url, id }: Link) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

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
				<Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
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
									<DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
										<Icons.share className='mr-2 h-4 w-4' />
										<span>Share</span>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
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
						<EditDialog
							description={description}
							id={id}
							slug={slug}
							url={url}
							closeModal={() => setIsEditDialogOpen(false)}
						/>
					</Dialog>
					<ShareDialog slug={slug} />
				</Dialog>
			</div>
		</Card>
	)
}
