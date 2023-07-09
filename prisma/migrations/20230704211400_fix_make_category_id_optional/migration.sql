-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_category_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
