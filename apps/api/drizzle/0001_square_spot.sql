CREATE TYPE "public"."pronouns" AS ENUM('he', 'she');--> statement-breakpoint
CREATE TYPE "public"."topics" AS ENUM('python', 'software development', 'artificial intelligence', 'web development', 'programming', 'data science', 'technology', 'humor', 'deep learning', 'machine learning', 'marketing', 'blockchain', 'coding', 'react', 'work', 'society', 'lifestyle', 'web3', 'java', 'math', 'space', 'sports', 'media', 'docker', 'race', 'music', 'justice', 'gaming');--> statement-breakpoint
CREATE TABLE "user_interests" (
	"user_id" text,
	"topic" "topics" NOT NULL,
	CONSTRAINT "user_interests_user_id_topic_pk" PRIMARY KEY("user_id","topic")
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" SET DEFAULT 'https://22eogg5076.ufs.sh/f/Vz9Fn0Bzntsc7vtSzf6QSXkVg5py0uh7H832bEJCnsj6IYUx';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "pronouns" "pronouns";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" varchar(160);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" varchar(30);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "has_completed_onboarding" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "topic_idx" ON "user_interests" USING btree ("topic");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");