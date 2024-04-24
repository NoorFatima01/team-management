create type "public"."project_status" as enum ('IN_PROGRESS', 'COMPLETED', 'CANCELLED');

alter table "public"."projects" add column "project_status" project_status not null default 'IN_PROGRESS'::project_status;


