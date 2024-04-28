create table "public"."files-uploaders" (
    "file_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "uploader_id" uuid,
    "path" text not null
);


alter table "public"."files-uploaders" enable row level security;

CREATE UNIQUE INDEX "files-uploaders_pkey" ON public."files-uploaders" USING btree (file_id);

alter table "public"."files-uploaders" add constraint "files-uploaders_pkey" PRIMARY KEY using index "files-uploaders_pkey";

alter table "public"."files-uploaders" add constraint "public_files-uploaders_uploader_id_fkey" FOREIGN KEY (uploader_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."files-uploaders" validate constraint "public_files-uploaders_uploader_id_fkey";

grant delete on table "public"."files-uploaders" to "anon";

grant insert on table "public"."files-uploaders" to "anon";

grant references on table "public"."files-uploaders" to "anon";

grant select on table "public"."files-uploaders" to "anon";

grant trigger on table "public"."files-uploaders" to "anon";

grant truncate on table "public"."files-uploaders" to "anon";

grant update on table "public"."files-uploaders" to "anon";

grant delete on table "public"."files-uploaders" to "authenticated";

grant insert on table "public"."files-uploaders" to "authenticated";

grant references on table "public"."files-uploaders" to "authenticated";

grant select on table "public"."files-uploaders" to "authenticated";

grant trigger on table "public"."files-uploaders" to "authenticated";

grant truncate on table "public"."files-uploaders" to "authenticated";

grant update on table "public"."files-uploaders" to "authenticated";

grant delete on table "public"."files-uploaders" to "service_role";

grant insert on table "public"."files-uploaders" to "service_role";

grant references on table "public"."files-uploaders" to "service_role";

grant select on table "public"."files-uploaders" to "service_role";

grant trigger on table "public"."files-uploaders" to "service_role";

grant truncate on table "public"."files-uploaders" to "service_role";

grant update on table "public"."files-uploaders" to "service_role";

create policy "Enable all operations for members and heads"
on "public"."files-uploaders"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['TEAM_HEAD'::role, 'TEAM_MEMBER'::role]))))));



