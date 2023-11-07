import { siteConfig } from '@/config/site'
import { Icons } from '@/components/Icons'
import { cn } from '@/lib/utils'

export const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
	return (
		<footer className={cn(className)}>
			<div className='flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 md:pl-[50px]'>
				<div className='flex flex-col items-center gap-4 px-8 text-center md:flex-row md:gap-2 md:px-0'>
					<Icons.logo />
					<p className='text-center text-sm leading-loose md:text-left'>
						Built by{' '}
						<a
							href={siteConfig.links.personal}
							target='_blank'
							rel='noreferrer'
							className='font-medium underline underline-offset-4'
						>
							BreinerJT
						</a>
						. Hosted on{' '}
						<a
							href='https://vercel.com'
							target='_blank'
							rel='noreferrer'
							className='font-medium underline underline-offset-4'
						>
							Vercel
						</a>
						. The source code is available on{' '}
						<a
							href={siteConfig.links.github}
							target='_blank'
							rel='noreferrer'
							className='font-medium underline underline-offset-4'
						>
							GitHub
						</a>
						.
					</p>
				</div>
			</div>
		</footer>
	)
}
