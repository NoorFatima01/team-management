create table "public"."teams-members" (
    "member_id" uuid not null,
    "team_id" uuid not null,
    "isTeamHead" boolean not null default false
);


alter table "public"."teams-members" enable row level security;

CREATE UNIQUE INDEX "teams-members_pkey" ON public."teams-members" USING btree (member_id, team_id);

alter table "public"."teams-members" add constraint "teams-members_pkey" PRIMARY KEY using index "teams-members_pkey";

alter table "public"."teams-members" add constraint "public_teams-members_member_id_fkey" FOREIGN KEY (member_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teams-members" validate constraint "public_teams-members_member_id_fkey";

grant delete on table "public"."teams-members" to "anon";

grant insert on table "public"."teams-members" to "anon";

grant references on table "public"."teams-members" to "anon";

grant select on table "public"."teams-members" to "anon";

grant trigger on table "public"."teams-members" to "anon";

grant truncate on table "public"."teams-members" to "anon";

grant update on table "public"."teams-members" to "anon";

grant delete on table "public"."teams-members" to "authenticated";

grant insert on table "public"."teams-members" to "authenticated";

grant references on table "public"."teams-members" to "authenticated";

grant select on table "public"."teams-members" to "authenticated";

grant trigger on table "public"."teams-members" to "authenticated";

grant truncate on table "public"."teams-members" to "authenticated";

grant update on table "public"."teams-members" to "authenticated";

grant delete on table "public"."teams-members" to "service_role";

grant insert on table "public"."teams-members" to "service_role";

grant references on table "public"."teams-members" to "service_role";

grant select on table "public"."teams-members" to "service_role";

grant trigger on table "public"."teams-members" to "service_role";

grant truncate on table "public"."teams-members" to "service_role";

grant update on table "public"."teams-members" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."teams"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."teams-members"
as permissive
for insert
to authenticated
with check (true);



