alter table "public"."members-notifications" drop constraint "public_members-notifications_member_id_fkey";

alter table "public"."members-notifications" add constraint "public_members-notifications_member_id_fkey" FOREIGN KEY (member_id) REFERENCES profiles(id) not valid;

alter table "public"."members-notifications" validate constraint "public_members-notifications_member_id_fkey";

create policy "Enable insert for everyone"
on "public"."members-notifications"
as permissive
for insert
to public
with check (true);

create policy "Enable read access for authenticated users"
on "public"."members-notifications"
as permissive
for select
to authenticated
using (true);

create policy "Enable insert for everyone"
on "public"."notifications"
as permissive
for insert
to public
with check (true);

create policy "Enable update access for authenticated users" 
on "public"."notifications" 
as permissive 
for update 
to authenticated 
using (true);

create policy "Enable read access for authenticated users"
on "public"."notifications"
as permissive
for select
to authenticated
using (true);
