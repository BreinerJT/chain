import z from 'zod'

export type EditLinkForm = z.infer<typeof CreateLinkSchema>
export type NewLinkForm = z.infer<typeof CreateLinkSchema>

export const LinkSchema = z.object({
	id: z.number(),
	url: z.string(),
	slug: z.string(),
	description: z.string().optional()
})

export const CreateLinkSchema = z.object({
	url: z
		.string()
		.min(1, 'URL is required.')
		.url('Remember URLs must start with https://'),
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
	url: z.string().min(1, 'URL is required.').url('Enter a valid URL.'),
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
