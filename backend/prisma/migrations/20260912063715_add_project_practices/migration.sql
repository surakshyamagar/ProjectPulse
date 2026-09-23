-- CreateTable
CREATE TABLE "ProjectPractice" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "implemented" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectPractice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectPractice_projectId_idx" ON "ProjectPractice"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectPractice_projectId_key_key" ON "ProjectPractice"("projectId", "key");

-- AddForeignKey
ALTER TABLE "ProjectPractice" ADD CONSTRAINT "ProjectPractice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
