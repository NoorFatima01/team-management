create type "public"."role" as enum ('TEAM_MEMBER', 'TEAM_HEAD');

drop policy "Enable insert for authenticated users with role team head" on "public"."projects";

drop policy "Enable insert for authenticated users with role team-head" on "public"."teams";

alter table "public"."profiles" add column "role" role not null default 'TEAM_MEMBER'::role;

create policy "Enable insert for authenticated users with role team head"
on "public"."projects"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_HEAD'::role)))));


create policy "Enable insert for authenticated users with role team-head"
on "public"."teams"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_HEAD'::role)))));



