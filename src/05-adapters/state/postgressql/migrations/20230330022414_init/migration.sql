-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "cardName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardText" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cardSet" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardConfig" (
    "id" SERIAL NOT NULL,
    "configName" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulations" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "Regulations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");

-- AddForeignKey
ALTER TABLE "CardConfig" ADD CONSTRAINT "CardConfig_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regulations" ADD CONSTRAINT "Regulations_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
