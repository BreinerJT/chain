import { Navbar } from '@/components/Navbar'

interface Props {
	children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
