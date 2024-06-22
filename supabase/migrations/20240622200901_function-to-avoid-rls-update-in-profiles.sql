alter table "public"."teams-members" add constraint "public_teams-members_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teams-members" validate constraint "public_teams-members_team_id_fkey";

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


