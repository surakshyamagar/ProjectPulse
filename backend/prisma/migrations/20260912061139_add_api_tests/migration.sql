-- CreateTable
CREATE TABLE "ApiTest" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "testedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApiTest_projectId_idx" ON "ApiTest"("projectId");

-- AddForeignKey
ALTER TABLE "ApiTest" ADD CONSTRAINT "ApiTest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
