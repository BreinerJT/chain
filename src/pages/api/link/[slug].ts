import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/server/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { slug } = req.query

	if (!slug || typeof slug !== 'string') {
		return res.status(404).json({
			error: 'URLs should be like this: /r/customSlug'
		})
	}

	const data = await db.link.findFirst({
		where: {
			slug: {
				equals: slug
			}
		}
	})

	if (!data) {
		return res.status(404).json({
			error: `Slug may be removed or not found.`
		})
	}
	return res.json(data)
}
