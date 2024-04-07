create type "public"."status" as enum ('ACCEPTED', 'REJECTED', 'PENDING');

create table "public"."invitations" (
    "inv_id" uuid not null default gen_random_uuid(),
    "text" text,
    "teamHead_id" uuid,
    "member_id" uuid,
    "inv_status" status not null default 'PENDING'::status,
    "team_id" uuid
);


alter table "public"."invitations" enable row level security;

CREATE UNIQUE INDEX invitations_pkey ON public.invitations USING btree (inv_id);

alter table "public"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."invitations" add constraint "public_invitations_member_id_fkey" FOREIGN KEY (member_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "public_invitations_member_id_fkey";

alter table "public"."invitations" add constraint "public_invitations_teamHead_id_fkey" FOREIGN KEY ("teamHead_id") REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "public_invitations_teamHead_id_fkey";

alter table "public"."invitations" add constraint "public_invitations_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "public_invitations_team_id_fkey";

grant delete on table "public"."invitations" to "anon";

grant insert on table "public"."invitations" to "anon";

grant references on table "public"."invitations" to "anon";

grant select on table "public"."invitations" to "anon";

grant trigger on table "public"."invitations" to "anon";

grant truncate on table "public"."invitations" to "anon";

grant update on table "public"."invitations" to "anon";

grant delete on table "public"."invitations" to "authenticated";

grant insert on table "public"."invitations" to "authenticated";

grant references on table "public"."invitations" to "authenticated";

grant select on table "public"."invitations" to "authenticated";

grant trigger on table "public"."invitations" to "authenticated";

grant truncate on table "public"."invitations" to "authenticated";

grant update on table "public"."invitations" to "authenticated";

grant delete on table "public"."invitations" to "service_role";

grant insert on table "public"."invitations" to "service_role";

grant references on table "public"."invitations" to "service_role";

grant select on table "public"."invitations" to "service_role";

grant trigger on table "public"."invitations" to "service_role";

grant truncate on table "public"."invitations" to "service_role";

grant update on table "public"."invitations" to "service_role";

create policy "Enable insert for authenticated users"
on "public"."invitations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated"
on "public"."invitations"
as permissive
for select
to authenticated
using (true);


create policy "Enable update access for authenticated users"
on "public"."invitations"
as permissive
for update
to authenticated
using (true);



