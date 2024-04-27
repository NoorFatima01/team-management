

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_team_projects(x integer, row_id uuid)
 RETURNS void
 LANGUAGE sql
AS $function$ update teams set projects_in_progress = projects_in_progress + x where team_id = row_id $function$
;

create policy "Enable update access for authenticated users"
on "public"."teams"
as permissive
for update
to authenticated
using (true);



