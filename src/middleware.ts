import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
	const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
	const session = await getToken({ req })

	if (isAuthPage) {
		if (!session) {
			return NextResponse.redirect(new URL('/dashboard', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth']
}
