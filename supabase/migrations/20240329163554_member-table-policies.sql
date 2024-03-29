create policy "Enable delete for users based on user_id"
on "public"."members"
as permissive
for delete
to public
using ((auth.uid() = member_id));


create policy "Enable insert for authenticated users only"
on "public"."members"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users"
on "public"."members"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on email"
on "public"."members"
as permissive
for update
to public
using ((auth.uid() = member_id))
with check ((auth.uid() = member_id));



