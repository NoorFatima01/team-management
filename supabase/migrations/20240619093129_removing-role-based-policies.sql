drop policy "Enable insert for authenticated users with role user " on "public"."members";

drop policy "Enable all operations for members and heads" on "public"."files-uploaders";

drop policy "Enable insert access to member or head" on "public"."messages";

drop policy "Enable insert for authenticated users with role team head" on "public"."projects";

drop policy "Enable update for team members or heads" on "public"."projects";

drop policy "Allow every operation for members or heads" on "public"."tasks";

drop policy "Enable insert for members or head" on "public"."teamChatRoom";

drop policy "Enable insert for authenticated users with role team-head" on "public"."teams";

alter table "public"."profiles" drop column "role";

create policy "Enable insert for authenticated users "
on "public"."members"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Enable all operations for members and heads"
on "public"."files-uploaders"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Enable insert access to member or head"
on "public"."messages"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Enable insert for authenticated users with role team head"
on "public"."projects"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Enable update for team members or heads"
on "public"."projects"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Allow every operation for members or heads"
on "public"."tasks"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Enable insert for members or head"
on "public"."teamChatRoom"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Enable insert for authenticated users with role team-head"
on "public"."teams"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = auth.uid()))));



DROP TYPE role CASCADE;