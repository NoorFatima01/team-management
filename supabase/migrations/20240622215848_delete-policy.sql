set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_teams_joined(requester_id uuid, user_id uuid, updated_teams_joined smallint)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE profiles
  SET teams_joined = updated_teams_joined
  WHERE id = user_id;
END;
$function$
;

create policy "Enable delete for users based on user_id"
on "public"."teams-members"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = member_id));



