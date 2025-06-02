import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { articles } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { auth, getAuth } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

export const articlesRouter = createTRPCRouter({
  // POST equivalent - save URL
  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
        title: z.string().optional(),
        description: z.string().optional(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Manual auth check
      const { userId } = await auth();
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      //   If user is authenticated
      const article = await ctx.db
        .insert(articles)
        .values({
          userId: userId,
          url: input.url,
          title: input.title,
          description: input.description,
          tags: input.tags,
        })
        .returning();

      return article[0];
    }),

  // GET equivalent - fetch user articles
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Manual auth check
    const { userId } = await auth();
    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return ctx.db
      .select()
      .from(articles)
      .where(eq(articles.userId, userId))
      .orderBy(articles.createdAt);
  }),

  // DELETE equivalent
  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Manual auth check
      const { userId } = await auth();
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      return ctx.db
        .delete(articles)
        .where(and(eq(articles.id, input.id), eq(articles.userId, userId)));
    }),

  // PUT equivalent - update tags
  updateTags: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        tags: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Manual auth check
      const { userId } = await auth();
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      return ctx.db
        .update(articles)
        .set({ tags: input.tags })
        .where(and(eq(articles.id, input.id), eq(articles.userId, userId)));
    }),
});
