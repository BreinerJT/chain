interface Props {
	children: React.ReactNode
}

export const DashboardShell = ({ children }: Props) => {
	return <div className='container mx-auto px-4'>{children}</div>
}
