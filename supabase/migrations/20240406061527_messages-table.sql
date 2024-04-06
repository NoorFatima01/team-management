drop policy "Enable update for users based on email" on "public"."members";

create table "public"."messages" (
    "msg_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "text" text
);


alter table "public"."messages" enable row level security;

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (msg_id);

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

create policy "Enable insert access to member or head"
on "public"."messages"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['TEAM_MEMBER'::role, 'TEAM_HEAD'::role]))))));



