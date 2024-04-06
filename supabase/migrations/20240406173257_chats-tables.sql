create table "public"."teamChatRoom" (
    "team_id" uuid not null,
    "msg_id" uuid not null,
    "sender_id" uuid
);


alter table "public"."teamChatRoom" enable row level security;

CREATE UNIQUE INDEX "teamChatRoom_pkey" ON public."teamChatRoom" USING btree (team_id, msg_id);

alter table "public"."teamChatRoom" add constraint "teamChatRoom_pkey" PRIMARY KEY using index "teamChatRoom_pkey";

alter table "public"."teamChatRoom" add constraint "public_teamChatRoom_msg_id_fkey" FOREIGN KEY (msg_id) REFERENCES messages(msg_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teamChatRoom" validate constraint "public_teamChatRoom_msg_id_fkey";

alter table "public"."teamChatRoom" add constraint "public_teamChatRoom_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teamChatRoom" validate constraint "public_teamChatRoom_sender_id_fkey";

alter table "public"."teamChatRoom" add constraint "public_teamChatRoom_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teamChatRoom" validate constraint "public_teamChatRoom_team_id_fkey";

grant delete on table "public"."teamChatRoom" to "anon";

grant insert on table "public"."teamChatRoom" to "anon";

grant references on table "public"."teamChatRoom" to "anon";

grant select on table "public"."teamChatRoom" to "anon";

grant trigger on table "public"."teamChatRoom" to "anon";

grant truncate on table "public"."teamChatRoom" to "anon";

grant update on table "public"."teamChatRoom" to "anon";

grant delete on table "public"."teamChatRoom" to "authenticated";

grant insert on table "public"."teamChatRoom" to "authenticated";

grant references on table "public"."teamChatRoom" to "authenticated";

grant select on table "public"."teamChatRoom" to "authenticated";

grant trigger on table "public"."teamChatRoom" to "authenticated";

grant truncate on table "public"."teamChatRoom" to "authenticated";

grant update on table "public"."teamChatRoom" to "authenticated";

grant delete on table "public"."teamChatRoom" to "service_role";

grant insert on table "public"."teamChatRoom" to "service_role";

grant references on table "public"."teamChatRoom" to "service_role";

grant select on table "public"."teamChatRoom" to "service_role";

grant trigger on table "public"."teamChatRoom" to "service_role";

grant truncate on table "public"."teamChatRoom" to "service_role";

grant update on table "public"."teamChatRoom" to "service_role";

create policy "Enable read access for all users"
on "public"."messages"
as permissive
for select
to public
using (true);


create policy "Enable insert for members or head"
on "public"."teamChatRoom"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['TEAM_MEMBER'::role, 'TEAM_HEAD'::role]))))));


create policy "Enable read access for all users"
on "public"."teamChatRoom"
as permissive
for select
to public
using (true);



