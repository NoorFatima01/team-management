create table "public"."projects" (
    "project_id" uuid not null,
    "start_date" date not null,
    "end_date" date,
    "name" text,
    "description" text,
    "team_id" uuid
);


alter table "public"."projects" enable row level security;

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (project_id);

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."projects" add constraint "public_projects_team-id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "public_projects_team-id_fkey";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

create policy "Enable insert for authenticated users with role team head"
on "public"."projects"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_HEAD'::role)))));


create policy "Enable read access for all users"
on "public"."projects"
as permissive
for select
to public
using (true);



