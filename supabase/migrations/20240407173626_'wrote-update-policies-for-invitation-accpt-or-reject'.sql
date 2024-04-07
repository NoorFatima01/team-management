drop policy "Enable insert for authenticated users with role team-head" on "public"."teams-members";

create policy "Enable update access for authenticated users"
on "public"."members"
as permissive
for update
to authenticated
using (true);


create policy "Enable insert for authenticated users"
on "public"."teams-members"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable update access for authenticated users"
on "public"."teams-members"
as permissive
for update
to authenticated
using (true);



