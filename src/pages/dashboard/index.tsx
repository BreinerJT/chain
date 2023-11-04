import { DashboardShell } from '@/components/DashboardShell'
import { LinkDetails } from '@/components/LinkDetails'
import { Input } from '@/components/ui/input'

export default function DashboardPage() {
	return (
		<DashboardShell>
			<div className='container mx-auto mt-6'>
				<div className='grid gap-6'>
					<Input
						placeholder='Search your link here'
						className='dark:bg-zinc-900'
					/>
					<div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
						<LinkDetails />
						<LinkDetails />
						<LinkDetails />
						<LinkDetails />
						<LinkDetails />
						<LinkDetails />
					</div>
				</div>
			</div>
		</DashboardShell>
	)
}
