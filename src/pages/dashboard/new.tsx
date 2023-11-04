import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function NewLinkPage() {
	return (
		<div className='container mx-auto mt-4 grid gap-8 px-4'>
			<div className='grid gap-4'>
				<Label htmlFor='url'>URL</Label>
				<Input
					placeholder='https://'
					className='dark:bg-zinc-900'
					id='url'
					name='url'
				/>
			</div>
			<div className='grid gap-4'>
				<Label htmlFor='slug'>Custom slug</Label>
				<Input
					placeholder='Custom slug'
					className='dark:bg-zinc-900'
					id='slug'
					name='slug'
				/>
			</div>
			<div className='grid gap-4'>
				<Label htmlFor='description'>Description (Optional)</Label>
				<Textarea
					className='resize-none dark:bg-zinc-900'
					id='description'
					name='description'
				/>
			</div>
			<div className='flex justify-end'>
				<Button variant='ghost'>Create new Link</Button>
			</div>
		</div>
	)
}
