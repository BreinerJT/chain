import { NextResponse, type NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
	const session = await getToken({ req })

	const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard', req.url))
		}
	}

	const isSlugPage = req.nextUrl.pathname.startsWith('/r')

	if (isSlugPage) {
		const slug = req.nextUrl.pathname.split('/').pop() as string
		const data = await fetch(`${req.nextUrl.origin}/api/link/${slug}`)

		const parsedData = await data.json()

		if (data.status === 404) {
			return NextResponse.redirect(
				`${req.nextUrl.origin}/notFound?message=${parsedData.error}`
			)
		}

		return NextResponse.redirect(new URL(parsedData.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth', '/r/:slug*']
}
