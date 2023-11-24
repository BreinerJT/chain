import { type AppType } from 'next/app'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'

import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import { AppLayout } from '@/components/layouts/AppLayout'
import { Toaster } from '@/components/ui/toaster'
import { api } from '@/utils/api'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const fontHeading = localFont({
	src: '../../public/assets/fonts/CalSans-SemiBold.woff2',
	variable: '--font-heading'
})

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
})

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
				<style
					dangerouslySetInnerHTML={{
						__html: `
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }`
					}}
				/>
				<main
					className={cn(
						'min-h-screen bg-background font-sans antialiased',
						fontHeading.variable
					)}
				>
					<AppLayout>
						<Component {...pageProps} />
						<Analytics />
					</AppLayout>
				</main>
				<Toaster />
			</ThemeProvider>
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp)
