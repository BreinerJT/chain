import z from 'zod'

export const LinkSchema = z.object({
	id: z.number(),
	url: z.string(),
	slug: z.string(),
	description: z.string().optional()
})

export const CreateLinkSchema = z.object({
	url: z.string().min(1, 'Url is required.').url('Enter a valid url.'),
	slug: z
		.string()
		.min(1, 'Slug is required.')
		.regex(
			/^[a-zA-Z0-9_-]+$/i,
			"Slugs can't have blank spaces or special characters."
		),
	description: z.string().optional()
})

export const EditLinkSchema = z.object({
	id: z.number(),
	url: z.string().min(1, 'Url is required.').url('Enter a valid url.'),
	slug: z
		.string()
		.min(1, 'Slug is required.')
		.regex(
			/^[a-zA-Z0-9_-]+$/i,
			"Slugs can't have blank spaces or special characters."
		),
	description: z.string().optional()
})

export const GetLinkSchema = z.object({
	id: z.number()
})

export const FilterLinksSchema = z.object({
	filter: z.string()
})
