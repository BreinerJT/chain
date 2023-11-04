import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from './ui/card'
import { Button } from './ui/button'
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Icons } from './Icons'

interface Props {
	url?: string
	slug?: string
	id?: number
	description?: string
}

export const LinkDetails: React.FC<Props> = ({
	description,
	id,
	slug,
	url
}) => {
	return (
		<Card className='flex justify-between p-4 dark:bg-zinc-900'>
			<div className='truncate'>
				<CardHeader>
					<CardTitle>
						<a href=''>/r/slug </a>
						<Button size='icon' variant='ghost' className='ml-2'>
							<Icons.copy className='h-4 w-4' />
						</Button>
					</CardTitle>
					<CardDescription>http://localhost:3000/dashboard</CardDescription>
				</CardHeader>
				<CardContent>No description.</CardContent>
			</div>
			<div className='py-6'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='sm'>
							<Icons.moreVertical className='h-4 w-4' />
							<span className='sr-only'>Link options</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='dark:bg-[#121212]'>
						<DropdownMenuItem>
							<Icons.copy className='mr-2 h-4 w-4' />
							<span>Copy</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icons.edit className='mr-2 h-4 w-4' />
							<span>Edit</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icons.trash className='mr-2 h-4 w-4' />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</Card>
	)
}
