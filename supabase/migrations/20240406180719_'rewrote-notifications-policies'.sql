drop policy "Enable read for authenticated" on "public"."members-notifications";

drop policy "Enable insert access to member or head" on "public"."messages";

drop policy "Enable read for authenticated users" on "public"."notifications";

revoke delete on table "public"."messages" from "anon";

revoke insert on table "public"."messages" from "anon";

revoke references on table "public"."messages" from "anon";

revoke select on table "public"."messages" from "anon";

revoke trigger on table "public"."messages" from "anon";

revoke truncate on table "public"."messages" from "anon";

revoke update on table "public"."messages" from "anon";

revoke delete on table "public"."messages" from "authenticated";

revoke insert on table "public"."messages" from "authenticated";

revoke references on table "public"."messages" from "authenticated";

revoke select on table "public"."messages" from "authenticated";

revoke trigger on table "public"."messages" from "authenticated";

revoke truncate on table "public"."messages" from "authenticated";

revoke update on table "public"."messages" from "authenticated";

revoke delete on table "public"."messages" from "service_role";

revoke insert on table "public"."messages" from "service_role";

revoke references on table "public"."messages" from "service_role";

revoke select on table "public"."messages" from "service_role";

revoke trigger on table "public"."messages" from "service_role";

revoke truncate on table "public"."messages" from "service_role";

revoke update on table "public"."messages" from "service_role";

alter table "public"."messages" drop constraint "messages_pkey";

drop index if exists "public"."messages_pkey";

drop table "public"."messages";

create policy "Enable read access for authenticated users"
on "public"."members-notifications"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for authenticated users"
on "public"."notifications"
as permissive
for select
to authenticated
using (true);



