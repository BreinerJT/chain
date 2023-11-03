import { Inter } from 'next/font/google'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { api } from '@/utils/api'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SessionProvider session={session}>
			<main
				className={cn(
					'min-h-screen bg-zinc-950 text-white antialiased',
					inter.className
				)}
			>
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp)
