-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "create_at" DROP NOT NULL,
ALTER COLUMN "update_at" DROP NOT NULL;
