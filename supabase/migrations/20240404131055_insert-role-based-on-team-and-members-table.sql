drop policy "Enable insert for authenticated users only" on "public"."members";

drop policy "Enable insert for authenticated users only" on "public"."teams";

create policy "Enable insert for authenticated users with role user "
on "public"."members"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'USER'::role)))));


create policy "Enable insert for authenticated users with role team-member"
on "public"."teams"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'TEAM_MEMBER'::role)))));



