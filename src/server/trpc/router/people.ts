import { z } from "zod";
import { zPerson } from "../../../types/Person";

import { router, protectedProcedure } from "../trpc";

export const peopleRouter = router({
  create: protectedProcedure
    .input(z.object({ person: zPerson }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.person.create({
        data: {
          ...input.person,
          user: { connect: { id: ctx.session?.user.id } },
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.person.findMany({
      where: { user: { id: ctx.session?.user.id } },
    });
  }),
  update: protectedProcedure
    .input(z.object({ person: zPerson }))
    .mutation(({ ctx, input }) => {
      // TODO error instead of noop when you try to update someone else's person
      return ctx.prisma.person.updateMany({
        where: { id: input.person.id, user: { id: ctx.session?.user.id } },
        data: input.person,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ personId: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      // TODO error instead of noop when you try to delete someone else's person
      return ctx.prisma.person.deleteMany({
        where: { id: input.personId, user: { id: ctx.session?.user.id } },
      });
    }),
});
