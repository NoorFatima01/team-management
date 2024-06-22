create policy "Enable delete for users based on user_id"
on "public"."teams"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = team_head));



