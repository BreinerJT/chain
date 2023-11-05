import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { CreateLinkSchema, GetLinkSchema } from '@/schemas/link.schema'

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

	getAll: protectedProcedure.query(({ ctx }) => {
		return ctx.db.link.findMany({
			orderBy: { createdAt: 'desc' },
			where: { createdBy: { id: ctx.session.user.id } }
		})
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!'
	})
})
