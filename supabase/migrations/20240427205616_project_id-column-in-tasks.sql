alter table "public"."tasks" add column "project_id" uuid;

alter table "public"."tasks" add constraint "public_tasks_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(project_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "public_tasks_project_id_fkey";


