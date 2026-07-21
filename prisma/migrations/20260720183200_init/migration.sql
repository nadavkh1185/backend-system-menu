-- CreateTable
CREATE TABLE "public"."menus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "menus_parentId_idx" ON "public"."menus"("parentId");

-- AddForeignKey
ALTER TABLE "public"."menus" ADD CONSTRAINT "menus_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
