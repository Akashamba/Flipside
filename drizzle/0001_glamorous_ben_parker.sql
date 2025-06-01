ALTER TABLE "flipside_articles" RENAME TO "flipside_article";--> statement-breakpoint
CREATE INDEX "title_idx" ON "flipside_article" USING btree ("title");