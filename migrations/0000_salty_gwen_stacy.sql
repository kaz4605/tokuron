CREATE TABLE `chat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`ownerId` integer NOT NULL,
	`name` text(1000) NOT NULL,
	FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`chatId` integer NOT NULL,
	`type` text(100) NOT NULL,
	`message` text NOT NULL,
	FOREIGN KEY (`chatId`) REFERENCES `chat`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text(500) NOT NULL,
	`email` text(200) NOT NULL,
	`password` text(500) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_key` ON `user` (`email`);