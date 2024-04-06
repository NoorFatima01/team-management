create table "public"."members-notifications" (
    "notf_id" uuid not null,
    "member_id" uuid not null
);


alter table "public"."members-notifications" enable row level security;

create table "public"."notifications" (
    "notf_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "text" text,
    "read" boolean not null default false
);


alter table "public"."notifications" enable row level security;

CREATE UNIQUE INDEX "members-notifications_pkey" ON public."members-notifications" USING btree (notf_id, member_id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (notf_id);

alter table "public"."members-notifications" add constraint "members-notifications_pkey" PRIMARY KEY using index "members-notifications_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."members-notifications" add constraint "public_members-notifications_member_id_fkey" FOREIGN KEY (member_id) REFERENCES members(member_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."members-notifications" validate constraint "public_members-notifications_member_id_fkey";

alter table "public"."members-notifications" add constraint "public_members-notifications_notf_id_fkey" FOREIGN KEY (notf_id) REFERENCES notifications(notf_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."members-notifications" validate constraint "public_members-notifications_notf_id_fkey";

grant delete on table "public"."members-notifications" to "anon";

grant insert on table "public"."members-notifications" to "anon";

grant references on table "public"."members-notifications" to "anon";

grant select on table "public"."members-notifications" to "anon";

grant trigger on table "public"."members-notifications" to "anon";

grant truncate on table "public"."members-notifications" to "anon";

grant update on table "public"."members-notifications" to "anon";

grant delete on table "public"."members-notifications" to "authenticated";

grant insert on table "public"."members-notifications" to "authenticated";

grant references on table "public"."members-notifications" to "authenticated";

grant select on table "public"."members-notifications" to "authenticated";

grant trigger on table "public"."members-notifications" to "authenticated";

grant truncate on table "public"."members-notifications" to "authenticated";

grant update on table "public"."members-notifications" to "authenticated";

grant delete on table "public"."members-notifications" to "service_role";

grant insert on table "public"."members-notifications" to "service_role";

grant references on table "public"."members-notifications" to "service_role";

grant select on table "public"."members-notifications" to "service_role";

grant trigger on table "public"."members-notifications" to "service_role";

grant truncate on table "public"."members-notifications" to "service_role";

grant update on table "public"."members-notifications" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";


