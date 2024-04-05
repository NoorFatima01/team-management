drop policy "Enable insert for authenticated users with role team-member" on "public"."teams";

drop policy "Enable insert for authenticated users only" on "public"."teams-members";

create policy "Enable insert for authenticated users with role team-head"
on "public"."teams"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_HEAD'::role)))));


create policy "Enable insert for authenticated users with role team-head"
on "public"."teams-members"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_HEAD'::role)))));



