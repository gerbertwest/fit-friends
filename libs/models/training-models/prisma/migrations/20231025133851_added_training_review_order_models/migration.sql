-- CreateTable
CREATE TABLE "trainings" (
    "training_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "backgroundImage" TEXT NOT NULL DEFAULT '',
    "level" TEXT NOT NULL DEFAULT '',
    "trainingType" TEXT NOT NULL DEFAULT '',
    "trainingTime" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "caloriesCount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "sex" TEXT NOT NULL DEFAULT '',
    "video" TEXT NOT NULL DEFAULT '',
    "raiting" INTEGER NOT NULL DEFAULT 0,
    "trainer_id" TEXT NOT NULL,
    "special" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("training_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "raiting" INTEGER NOT NULL DEFAULT 0,
    "message" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "orderPrice" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_training_id_key" ON "orders"("training_id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("training_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("training_id") ON DELETE CASCADE ON UPDATE CASCADE;
