CREATE TABLE `ai_usage` (
	`id` text PRIMARY KEY NOT NULL,
	`user_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`units` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `usage_time_idx` ON `ai_usage` (`created_at`);--> statement-breakpoint
CREATE INDEX `usage_user_time_idx` ON `ai_usage` (`user_hash`,`created_at`);