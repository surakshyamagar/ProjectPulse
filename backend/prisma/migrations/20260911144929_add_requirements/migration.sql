-- CreateEnum
CREATE TYPE "RequirementStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Requirement" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "RequirementStatus" NOT NULL DEFAULT 'TODO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Requirement_projectId_idx" ON "Requirement"("projectId");

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
