CREATE UNIQUE INDEX "exercise_variants_id_exercise_idx" ON "exercise_variants" USING btree ("id","exercise_id");--> statement-breakpoint
ALTER TABLE "exercise_prescriptions" DROP CONSTRAINT "exercise_prescriptions_exercise_variant_id_exercise_variants_id_fk";
--> statement-breakpoint
ALTER TABLE "exercise_prescriptions" ADD CONSTRAINT "prescriptions_variant_belongs_to_exercise_fk" FOREIGN KEY ("exercise_variant_id","exercise_id") REFERENCES "public"."exercise_variants"("id","exercise_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_prescriptions" ADD CONSTRAINT "exercise_prescriptions_sort_positive_check" CHECK ("exercise_prescriptions"."sort_order" > 0);--> statement-breakpoint
ALTER TABLE "mesocycles" ADD CONSTRAINT "mesocycles_sequence_positive_check" CHECK ("mesocycles"."sequence_number" IS NULL OR "mesocycles"."sequence_number" > 0);--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_number_positive_check" CHECK ("prescription_sets"."set_number" > 0);--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_reps_positive_check" CHECK ("prescription_sets"."target_reps" > 0);--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_rir_non_negative_check" CHECK ("prescription_sets"."target_rir" IS NULL OR "prescription_sets"."target_rir" >= 0);--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_rpe_range_check" CHECK ("prescription_sets"."target_rpe" IS NULL OR ("prescription_sets"."target_rpe" >= 0 AND "prescription_sets"."target_rpe" <= 10));--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_weight_non_negative_check" CHECK ("prescription_sets"."target_weight_kg" IS NULL OR "prescription_sets"."target_weight_kg" >= 0);--> statement-breakpoint
ALTER TABLE "prescription_sets" ADD CONSTRAINT "prescription_sets_rep_range_check" CHECK ("prescription_sets"."min_reps" IS NULL OR "prescription_sets"."max_reps" IS NULL OR "prescription_sets"."min_reps" <= "prescription_sets"."max_reps");--> statement-breakpoint
ALTER TABLE "training_weeks" ADD CONSTRAINT "training_weeks_number_positive_check" CHECK ("training_weeks"."week_number" > 0);--> statement-breakpoint
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_number_positive_check" CHECK ("workout_days"."day_number" > 0);--> statement-breakpoint
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_sort_positive_check" CHECK ("workout_days"."sort_order" > 0);
