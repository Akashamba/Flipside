CREATE TABLE "flipside_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"description" text,
	"tags" text,
	"created_at" timestamp DEFAULT now()
);
