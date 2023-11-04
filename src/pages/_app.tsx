import { Inter } from 'next/font/google'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { api } from '@/utils/api'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'
import { AppLayout } from '@/components/layouts/AppLayout'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<main
					className={cn(
						'bg-foreground min-h-screen antialiased',
						inter.className
					)}
				>
					<AppLayout>
						<Component {...pageProps} />
					</AppLayout>
				</main>
			</ThemeProvider>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp)
