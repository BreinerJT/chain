import { Navbar } from '@/components/navbar/Navbar'
import { MobileNavbar } from '../navbar/MobileNavbar'

interface Props {
	children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
	return (
		<>
			<Navbar className='hidden md:block' />
			<MobileNavbar className='md:hidden' />
			<div className='min-h-auto'>{children}</div>
		</>
	)
}
