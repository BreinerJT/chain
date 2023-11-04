import { Navbar } from '@/components/Navbar'

interface Props {
	children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			<div className='min-h-auto'>{children}</div>
		</>
	)
}
