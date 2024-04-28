create sequence "public"."tasks_task_id_seq";

create table "public"."tasks" (
    "task_id" integer not null default nextval('tasks_task_id_seq'::regclass),
    "title" text not null,
    "details" text not null,
    "status" project_status not null default 'IN_PROGRESS'::project_status,
    "filePath" text
);


alter table "public"."tasks" enable row level security;

alter sequence "public"."tasks_task_id_seq" owned by "public"."tasks"."task_id";

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (task_id);

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

create policy "Allow every operation for members or heads"
on "public"."tasks"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['TEAM_HEAD'::role, 'TEAM_MEMBER'::role]))))));





insert into storage.buckets
  (id, name, public)
values
  ('taskFiles', 'taskFiles', false);


CREATE POLICY "Enable all operations to authenticated users 2lrraq_0" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'taskFiles');
CREATE POLICY "Enable all operations to authenticated users 2lrraq_1" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'taskFiles');
CREATE POLICY "Enable all operations to authenticated users 2lrraq_2" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'taskFiles');
CREATE POLICY "Enable all operations to authenticated users 2lrraq_3" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'taskFiles');



