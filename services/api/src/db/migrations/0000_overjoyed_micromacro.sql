CREATE TYPE "public"."exercise_role" AS ENUM('PRIMARY', 'SECONDARY', 'VARIATION', 'ACCESSORY', 'HYPERTROPHY', 'REHAB', 'TECHNIQUE');--> statement-breakpoint
CREATE TYPE "public"."mesocycle_status" AS ENUM('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."movement_pattern" AS ENUM('SQUAT', 'HINGE', 'HORIZONTAL_PRESS', 'VERTICAL_PRESS', 'HORIZONTAL_PULL', 'VERTICAL_PULL', 'KNEE_EXTENSION', 'KNEE_FLEXION', 'HIP_EXTENSION', 'HIP_ABDUCTION', 'HIP_ADDUCTION', 'PLANTAR_FLEXION', 'ELBOW_FLEXION', 'ELBOW_EXTENSION', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."week_type" AS ENUM('STANDARD', 'PIVOT', 'DELOAD', 'TEST', 'OTHER');--> statement-breakpoint
CREATE TABLE "athletes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_prescriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workout_day_id" uuid NOT NULL,
	"exercise_id" uuid NOT NULL,
	"exercise_variant_id" uuid,
	"exercise_role" "exercise_role" NOT NULL,
	"sort_order" integer NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "exercise_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_id" uuid NOT NULL,
	"name" text NOT NULL,
	"modifiers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"movement_id" uuid,
	"name" text NOT NULL,
	"default_role" "exercise_role",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "foundation_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mesocycles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"athlete_id" uuid NOT NULL,
	"name" text NOT NULL,
	"sequence_number" integer,
	"description" text,
	"status" "mesocycle_status" DEFAULT 'DRAFT' NOT NULL,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"movement_pattern" "movement_pattern" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prescription_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_prescription_id" uuid NOT NULL,
	"set_number" integer NOT NULL,
	"target_reps" integer NOT NULL,
	"target_rir" integer,
	"target_rpe" integer,
	"target_weight_kg" integer,
	"min_reps" integer,
	"max_reps" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "training_weeks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mesocycle_id" uuid NOT NULL,
	"week_number" integer NOT NULL,
	"name" text,
	"week_type" "week_type" DEFAULT 'STANDARD' NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "workout_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"training_week_id" uuid NOT NULL,
	"day_number" integer NOT NULL,
	"name" text NOT NULL,
	"notes" text,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "exercise_prescriptions" ADD CONSTRAINT "exercise_prescriptions_workout_day_id_workout_days_id_fk" FOREIGN KEY ("workout_day_id") REFERENCES "public"."workout_days"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_prescriptions" ADD CONSTRAINT "exercise_prescriptions_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_prescriptions" ADD CONSTRAINT "exercise_prescriptions_exercise_variant_id_exercise_variants_id_fk" FOREIGN KEY ("exercise_variant_id") REFERENCES "public"."exercise_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_variants" ADD CONSTRAINT "exercise_variants_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_movement_id_movements_id_fk" FOREIGN KEY ("movement_id") REFERENCES "public"."movements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mesocycles" ADD CONSTRAINT "mesocycles_athlete_id_athletes_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."athletes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_exercise_prescription_id_exercise_prescriptions_id_fk" FOREIGN KEY ("exercise_prescription_id") REFERENCES "public"."exercise_prescriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_weeks" ADD CONSTRAINT "training_weeks_mesocycle_id_mesocycles_id_fk" FOREIGN KEY ("mesocycle_id") REFERENCES "public"."mesocycles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_training_week_id_training_weeks_id_fk" FOREIGN KEY ("training_week_id") REFERENCES "public"."training_weeks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "mesocycles_athlete_sequence_idx" ON "mesocycles" USING btree ("athlete_id","sequence_number");--> statement-breakpoint
CREATE UNIQUE INDEX "prescription_sets_prescription_number_idx" ON "prescription_sets" USING btree ("exercise_prescription_id","set_number");--> statement-breakpoint
CREATE UNIQUE INDEX "training_weeks_meso_number_idx" ON "training_weeks" USING btree ("mesocycle_id","week_number");--> statement-breakpoint
CREATE UNIQUE INDEX "workout_days_week_number_idx" ON "workout_days" USING btree ("training_week_id","day_number");