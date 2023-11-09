import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LinkDetailsSkeleton = () => {
	return (
		<Card className='flex justify-between p-4 dark:bg-zinc-900'>
			<div className='truncate'>
				<CardHeader>
					<CardTitle>
						<Skeleton className='h-7 w-3/5' />
					</CardTitle>
					<Skeleton className='h-4 w-52' />
				</CardHeader>
				<CardContent>
					<Skeleton className='h-5 w-52' />
				</CardContent>
			</div>
		</Card>
	)
}
