import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import {
	CreateLinkSchema,
	EditLinkSchema,
	FilterLinksSchema,
	GetLinkSchema
} from '@/schemas/link.schema'

export const linkRouter = createTRPCRouter({
	create: protectedProcedure
		.input(CreateLinkSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.link.create({
				data: {
					...input,
					creatorId: ctx.session.user.id
				}
			})
		}),

	update: protectedProcedure
		.input(EditLinkSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.link.update({
				where: { id: input.id },
				data: input
			})
		}),

	delete: protectedProcedure
		.input(GetLinkSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.link.delete({
				where: {
					id: input.id,
					AND: {
						creatorId: ctx.session.user.id
					}
				}
			})
		}),

	getAll: protectedProcedure
		.input(FilterLinksSchema)
		.query(({ ctx, input }) => {
			return ctx.db.link.findMany({
				orderBy: { createdAt: 'desc' },
				where: {
					creatorId: ctx.session.user.id,
					AND: input.filter
						? [
								{
									OR: [
										{
											url: {
												contains: input.filter
											}
										},
										{
											slug: {
												contains: input.filter
											}
										},
										{
											description: {
												contains: input.filter
											}
										}
									]
								}
						  ]
						: undefined
				}
			})
		}),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!'
	})
})
