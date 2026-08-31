CREATE TABLE "exercise_performances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workout_session_id" uuid NOT NULL,
	"exercise_id" uuid NOT NULL,
	"exercise_variant_id" uuid,
	"exercise_prescription_id" uuid,
	"sequence_number" integer NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "exercise_performances_sequence_positive_check" CHECK ("exercise_performances"."sequence_number" > 0)
);
--> statement-breakpoint
CREATE TABLE "set_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_performance_id" uuid NOT NULL,
	"prescription_set_id" uuid,
	"set_number" integer NOT NULL,
	"weight_kg" real NOT NULL,
	"reps" integer NOT NULL,
	"rir" real,
	"rpe" real,
	"completed_at" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "set_logs_set_number_positive_check" CHECK ("set_logs"."set_number" > 0),
	CONSTRAINT "set_logs_weight_non_negative_check" CHECK ("set_logs"."weight_kg" >= 0),
	CONSTRAINT "set_logs_reps_positive_check" CHECK ("set_logs"."reps" > 0),
	CONSTRAINT "set_logs_rir_non_negative_check" CHECK ("set_logs"."rir" IS NULL OR "set_logs"."rir" >= 0),
	CONSTRAINT "set_logs_rpe_range_check" CHECK ("set_logs"."rpe" IS NULL OR ("set_logs"."rpe" >= 0 AND "set_logs"."rpe" <= 10))
);
--> statement-breakpoint
CREATE TABLE "workout_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"athlete_id" uuid NOT NULL,
	"workout_day_id" uuid,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workout_sessions_completion_order_check" CHECK ("workout_sessions"."completed_at" IS NULL OR "workout_sessions"."completed_at" >= "workout_sessions"."started_at")
);
--> statement-breakpoint
ALTER TABLE "exercise_performances" ADD CONSTRAINT "exercise_performances_workout_session_id_workout_sessions_id_fk" FOREIGN KEY ("workout_session_id") REFERENCES "public"."workout_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_performances" ADD CONSTRAINT "exercise_performances_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_performances" ADD CONSTRAINT "exercise_performances_exercise_variant_id_exercise_variants_id_fk" FOREIGN KEY ("exercise_variant_id") REFERENCES "public"."exercise_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_performances" ADD CONSTRAINT "exercise_performances_exercise_prescription_id_exercise_prescriptions_id_fk" FOREIGN KEY ("exercise_prescription_id") REFERENCES "public"."exercise_prescriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set_logs" ADD CONSTRAINT "set_logs_exercise_performance_id_exercise_performances_id_fk" FOREIGN KEY ("exercise_performance_id") REFERENCES "public"."exercise_performances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "set_logs" ADD CONSTRAINT "set_logs_prescription_set_id_prescription_sets_id_fk" FOREIGN KEY ("prescription_set_id") REFERENCES "public"."prescription_sets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_athlete_id_athletes_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."athletes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_workout_day_id_workout_days_id_fk" FOREIGN KEY ("workout_day_id") REFERENCES "public"."workout_days"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "exercise_performances_session_sequence_idx" ON "exercise_performances" USING btree ("workout_session_id","sequence_number");--> statement-breakpoint
CREATE UNIQUE INDEX "set_logs_performance_set_number_idx" ON "set_logs" USING btree ("exercise_performance_id","set_number");