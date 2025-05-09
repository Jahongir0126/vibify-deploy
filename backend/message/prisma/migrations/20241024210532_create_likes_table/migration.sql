-- CreateTable
CREATE TABLE "likes" (
    "id" UUID NOT NULL,
    "liker_id" UUID NOT NULL,
    "liked_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);
