-- CreateTable
CREATE TABLE "preferences" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "preferred_gender" VARCHAR(50),
    "age_min" INTEGER NOT NULL,
    "age_max" INTEGER NOT NULL,
    "location_radius" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("id")
);
