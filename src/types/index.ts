export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | undefined;
  role?: string | null;
};

export type availableMember = {
  id: string;
  username: string;
  email: string;
  members: { open_to_work: boolean } | null;
};

export type messageUIType = {
  message: string;
  sender_name: string;
  sender_id: string;
};

export type memberProfile = {
  id: string;
  username: string;
  email: string;
  open_to_work: boolean;
  team?: string;
  role: string;
};

export type TaskDataWithProjectName = {
  title: string;
  details: string;
  projects: {
    name: string;
  };
};

export type Project = {
  project_id: string;
  name: string;
  project_status: string;
  teams: { name: string };
};

export type ProjectDataWithTeamName = {
  project_id: string;
  name: string;
  project_status: string;
  teams: { name: string };
};
export type ProjectsByTeam = {
  [teamName: string]: ProjectDataWithTeamName[];
};
