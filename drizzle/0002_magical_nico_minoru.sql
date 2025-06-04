ALTER TABLE "flipside_article" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "flipside_article" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flipside_article" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flipside_article" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "flipside_article" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;