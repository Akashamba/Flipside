import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { articles } from "@/server/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getMetadata } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
      const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
      });
      if (!session?.session.userId)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const metadata = await getMetadata(input.url);

      //   If user is authenticated
      const article = await ctx.db
        .insert(articles)
        .values({
          userId: session?.session.userId,
          url: input.url,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          title: input.title || metadata.title || input.url,
          description: input.description,
          tags: input.tags,
        })
        .returning();

      return article[0];
    }),

  // GET equivalent - fetch user articles
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Manual auth check
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session?.session.userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return ctx.db
      .select()
      .from(articles)
      .where(eq(articles.userId, session?.session.userId))
      .orderBy(desc(articles.createdAt));
  }),

  // DELETE equivalent
  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Manual auth check
      const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
      });
      if (!session?.session.userId)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      return ctx.db
        .delete(articles)
        .where(
          and(
            eq(articles.id, input.id),
            eq(articles.userId, session?.session.userId),
          ),
        );
    }),

  // PUT equivalent - update tags
  updateArticle: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().optional(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Manual auth check
      const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
      });
      if (!session?.session.userId)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      return ctx.db
        .update(articles)
        .set({
          title: input.title,
          tags: input.tags,
        })
        .where(
          and(
            eq(articles.id, input.id),
            eq(articles.userId, session?.session.userId),
          ),
        );
    }),
});
