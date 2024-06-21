import { create } from 'zustand';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

type dotVisibilityStore = {
  dotVisibility: boolean;
  setDotVisibility: (dotVisibility: boolean) => void;
};

export const useDotVisibilityStore = create<dotVisibilityStore>((set) => ({
  dotVisibility: false,
  setDotVisibility: (dotVisibility) => set({ dotVisibility }),
}));

type logInStatusStore = {
  logInStatus: boolean;
  setLogInStatus: (logInStatus: boolean) => void;
};

export const useLogInStatusStore = create<logInStatusStore>((set) => ({
  logInStatus: false,
  setLogInStatus: (logInStatus) => set({ logInStatus }),
}));

type canJoinTeamStore = {
  teamsJoined: number;
  fetchTeamsJoined: (userId: string | undefined) => Promise<void>;
  canJoinMoreTeams: () => boolean;
  increaseTeamsJoined: () => void;
};

export const useCanJoinTeamStore = create<canJoinTeamStore>((set) => ({
  teamsJoined: 0,
  fetchTeamsJoined: async (userId: string | undefined) => {
    if (!userId) return;
    const serverSupabase = createSupabaseBrowserClient();
    const { data } = await serverSupabase
      .from('profiles')
      .select('teams_joined')
      .eq('id', userId);
    set({ teamsJoined: data?.[0]?.teams_joined || 0 });
  },
  canJoinMoreTeams: () => {
    const state: canJoinTeamStore = useCanJoinTeamStore.getState();
    return state.teamsJoined < 3;
  },
  increaseTeamsJoined: () => {
    set((state) => ({ teamsJoined: state.teamsJoined + 1 }));
  },
}));
