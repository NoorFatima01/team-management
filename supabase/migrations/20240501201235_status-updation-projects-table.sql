alter table "public"."tasks" drop column "status";

alter table "public"."teams" drop column "projects_done";

create policy "Enable update for team members or heads"
on "public"."projects"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_HEAD'::role)))));



