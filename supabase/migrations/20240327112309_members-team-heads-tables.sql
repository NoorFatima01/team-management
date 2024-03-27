create table "public"."members" (
    "member_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "open_to_work" boolean default true
);


alter table "public"."members" enable row level security;

create table "public"."team-heads" (
    "team_head_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."team-heads" enable row level security;

CREATE UNIQUE INDEX members_pkey ON public.members USING btree (member_id);

CREATE UNIQUE INDEX "team-heads_pkey" ON public."team-heads" USING btree (team_head_id);

alter table "public"."members" add constraint "members_pkey" PRIMARY KEY using index "members_pkey";

alter table "public"."team-heads" add constraint "team-heads_pkey" PRIMARY KEY using index "team-heads_pkey";

alter table "public"."members" add constraint "public_members_member_id_fkey" FOREIGN KEY (member_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."members" validate constraint "public_members_member_id_fkey";

alter table "public"."team-heads" add constraint "public_team-heads_team_head_id_fkey" FOREIGN KEY (team_head_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."team-heads" validate constraint "public_team-heads_team_head_id_fkey";

grant delete on table "public"."members" to "anon";

grant insert on table "public"."members" to "anon";

grant references on table "public"."members" to "anon";

grant select on table "public"."members" to "anon";

grant trigger on table "public"."members" to "anon";

grant truncate on table "public"."members" to "anon";

grant update on table "public"."members" to "anon";

grant delete on table "public"."members" to "authenticated";

grant insert on table "public"."members" to "authenticated";

grant references on table "public"."members" to "authenticated";

grant select on table "public"."members" to "authenticated";

grant trigger on table "public"."members" to "authenticated";

grant truncate on table "public"."members" to "authenticated";

grant update on table "public"."members" to "authenticated";

grant delete on table "public"."members" to "service_role";

grant insert on table "public"."members" to "service_role";

grant references on table "public"."members" to "service_role";

grant select on table "public"."members" to "service_role";

grant trigger on table "public"."members" to "service_role";

grant truncate on table "public"."members" to "service_role";

grant update on table "public"."members" to "service_role";

grant delete on table "public"."team-heads" to "anon";

grant insert on table "public"."team-heads" to "anon";

grant references on table "public"."team-heads" to "anon";

grant select on table "public"."team-heads" to "anon";

grant trigger on table "public"."team-heads" to "anon";

grant truncate on table "public"."team-heads" to "anon";

grant update on table "public"."team-heads" to "anon";

grant delete on table "public"."team-heads" to "authenticated";

grant insert on table "public"."team-heads" to "authenticated";

grant references on table "public"."team-heads" to "authenticated";

grant select on table "public"."team-heads" to "authenticated";

grant trigger on table "public"."team-heads" to "authenticated";

grant truncate on table "public"."team-heads" to "authenticated";

grant update on table "public"."team-heads" to "authenticated";

grant delete on table "public"."team-heads" to "service_role";

grant insert on table "public"."team-heads" to "service_role";

grant references on table "public"."team-heads" to "service_role";

grant select on table "public"."team-heads" to "service_role";

grant trigger on table "public"."team-heads" to "service_role";

grant truncate on table "public"."team-heads" to "service_role";

grant update on table "public"."team-heads" to "service_role";


