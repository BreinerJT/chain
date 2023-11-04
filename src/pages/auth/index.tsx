import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

export default function Auth() {
	return (
		<div className='container mx-auto'>
			<div className='mt-16 grid items-center justify-center gap-8 px-4'>
				<Button variant='ghost'>
					<Icons.gmail className='mr-2 h-5 w-5' /> Sign in with Gmail
				</Button>
				<Button variant='ghost'>
					<Icons.github className='mr-2 h-5 w-5' /> Sign in with Github
				</Button>
			</div>
		</div>
	)
}
