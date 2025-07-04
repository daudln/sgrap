CREATE TYPE "public"."user_type_enum" AS ENUM('ADMIN', 'USER', 'STUDENT');--> statement-breakpoint
CREATE TYPE "public"."gender_enum" AS ENUM('MALE', 'FEMALE');--> statement-breakpoint
CREATE TYPE "public"."school_level" AS ENUM('NURSERY', 'PRE_PRIMARY', 'PRIMARY', 'SECONDARY');--> statement-breakpoint
CREATE TYPE "public"."school_type" AS ENUM('GOVERNMENT', 'PRIVATE');--> statement-breakpoint
CREATE TYPE "public"."class_level" AS ENUM('PRE_NURSERY', 'NURSERY', 'KINDERGARTEN', 'GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_4', 'GRADE_5', 'GRADE_6', 'GRADE_7', 'GRADE_8', 'FORM_ONE', 'FORM_TWO', 'FORM_THREE', 'FORM_FOUR', 'FORM_FIVE', 'FORM_SIX');--> statement-breakpoint
CREATE TYPE "public"."subject_category" AS ENUM('ART', 'SCIENCE');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(100) NOT NULL,
	"code" varchar(100) NOT NULL,
	CONSTRAINT "permission_name_unique" UNIQUE("name"),
	CONSTRAINT "permission_code_unique" UNIQUE("code"),
	CONSTRAINT "permission_name_code_unique" UNIQUE("name","code")
);
--> statement-breakpoint
CREATE TABLE "password_reset_token" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "password_reset_token_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "roles_to_permissions" (
	"role_id" varchar(50) NOT NULL,
	"permission_id" varchar(50) NOT NULL,
	CONSTRAINT "roles_to_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id"),
	CONSTRAINT "roles_to_permissions_role_id_permission_id_unique" UNIQUE("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"user_type_enum" "user_type_enum" DEFAULT 'USER',
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role_id" varchar(50),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "district" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(50) NOT NULL,
	"region_id" varchar(50) NOT NULL,
	CONSTRAINT "district_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"phone_number" varchar(12),
	"date_of_birth" timestamp,
	"gender_enum" "gender_enum"
);
--> statement-breakpoint
CREATE TABLE "region" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(50) NOT NULL,
	CONSTRAINT "region_name_unique" UNIQUE("name"),
	CONSTRAINT "region_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "school" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(100) NOT NULL,
	"registration_number" varchar(50) NOT NULL,
	"address" text,
	"phone" varchar(20),
	"email" varchar(150),
	"website" varchar(255),
	"region_id" varchar(50),
	"district_id" varchar(50),
	"ward_id" varchar(50),
	"street_id" varchar(50),
	"type" "school_type" NOT NULL,
	"level" "school_level" NOT NULL,
	CONSTRAINT "school_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE TABLE "street" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(50) NOT NULL,
	"ward_id" varchar(50) NOT NULL,
	CONSTRAINT "street_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"school_id" text NOT NULL,
	"class_level" "class_level" NOT NULL,
	"enrollment_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(100) NOT NULL,
	"category" "subject_category" NOT NULL,
	CONSTRAINT "subject_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "teacher" (
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"specialization" text
);
--> statement-breakpoint
CREATE TABLE "teachers_to_schools" (
	"teacher_id" text NOT NULL,
	"school_id" text NOT NULL,
	CONSTRAINT "teachers_to_schools_teacher_id_school_id_pk" PRIMARY KEY("teacher_id","school_id")
);
--> statement-breakpoint
CREATE TABLE "teachers_to_subjects" (
	"teacher_id" text NOT NULL,
	"school_subject_id" text NOT NULL,
	CONSTRAINT "teachers_to_subjects_teacher_id_school_subject_id_pk" PRIMARY KEY("teacher_id","school_subject_id")
);
--> statement-breakpoint
CREATE TABLE "ward" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(50) NOT NULL,
	"district_id" varchar(50) NOT NULL,
	CONSTRAINT "ward_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "school_subject" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"school_id" text NOT NULL,
	"subject_id" text NOT NULL,
	CONSTRAINT "school_subject_school_id_subject_id_unique" UNIQUE("school_id","subject_id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_to_permissions" ADD CONSTRAINT "roles_to_permissions_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_to_permissions" ADD CONSTRAINT "roles_to_permissions_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "district" ADD CONSTRAINT "district_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school" ADD CONSTRAINT "school_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school" ADD CONSTRAINT "school_district_id_district_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."district"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school" ADD CONSTRAINT "school_ward_id_ward_id_fk" FOREIGN KEY ("ward_id") REFERENCES "public"."ward"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school" ADD CONSTRAINT "school_street_id_street_id_fk" FOREIGN KEY ("street_id") REFERENCES "public"."street"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "street" ADD CONSTRAINT "street_ward_id_ward_id_fk" FOREIGN KEY ("ward_id") REFERENCES "public"."ward"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_id_profile_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_school_id_school_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_id_profile_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers_to_schools" ADD CONSTRAINT "teachers_to_schools_teacher_id_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers_to_schools" ADD CONSTRAINT "teachers_to_schools_school_id_school_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers_to_subjects" ADD CONSTRAINT "teachers_to_subjects_teacher_id_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers_to_subjects" ADD CONSTRAINT "teachers_to_subjects_school_subject_id_school_subject_id_fk" FOREIGN KEY ("school_subject_id") REFERENCES "public"."school_subject"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ward" ADD CONSTRAINT "ward_district_id_district_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."district"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_subject" ADD CONSTRAINT "school_subject_school_id_school_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_subject" ADD CONSTRAINT "school_subject_subject_id_subject_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subject"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "permission_name_index" ON "permission" USING btree ("name");--> statement-breakpoint
CREATE INDEX "code_index" ON "permission" USING btree ("code");--> statement-breakpoint
CREATE INDEX "role_name_index" ON "role" USING btree ("name");--> statement-breakpoint
CREATE INDEX "teacher_subject_teacher_idx" ON "teachers_to_subjects" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "teacher_subject_subject_idx" ON "teachers_to_subjects" USING btree ("school_subject_id");