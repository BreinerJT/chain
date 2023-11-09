import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { cn } from '@/lib/utils'

interface Props {
	children: React.ReactNode
}

export const DashboardShell = ({ children }: Props) => {
	return <div className='container mx-auto px-4'>{children}</div>
}
