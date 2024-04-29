export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      'files-uploaders': {
        Row: {
          created_at: string;
          file_id: string;
          path: string;
          uploader_id: string | null;
        };
        Insert: {
          created_at?: string;
          file_id: string;
          path: string;
          uploader_id?: string | null;
        };
        Update: {
          created_at?: string;
          file_id?: string;
          path?: string;
          uploader_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_files-uploaders_uploader_id_fkey';
            columns: ['uploader_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      invitations: {
        Row: {
          inv_id: string;
          inv_status: Database['public']['Enums']['status'];
          member_id: string | null;
          team_id: string | null;
          teamHead_id: string | null;
          text: string | null;
        };
        Insert: {
          inv_id?: string;
          inv_status?: Database['public']['Enums']['status'];
          member_id?: string | null;
          team_id?: string | null;
          teamHead_id?: string | null;
          text?: string | null;
        };
        Update: {
          inv_id?: string;
          inv_status?: Database['public']['Enums']['status'];
          member_id?: string | null;
          team_id?: string | null;
          teamHead_id?: string | null;
          text?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_invitations_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_invitations_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['team_id'];
          },
          {
            foreignKeyName: 'public_invitations_teamHead_id_fkey';
            columns: ['teamHead_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      members: {
        Row: {
          created_at: string;
          member_id: string;
          open_to_work: boolean | null;
        };
        Insert: {
          created_at?: string;
          member_id: string;
          open_to_work?: boolean | null;
        };
        Update: {
          created_at?: string;
          member_id?: string;
          open_to_work?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_members_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      'members-notifications': {
        Row: {
          member_id: string;
          notf_id: string;
        };
        Insert: {
          member_id: string;
          notf_id: string;
        };
        Update: {
          member_id?: string;
          notf_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_members-notifications_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_members-notifications_notf_id_fkey';
            columns: ['notf_id'];
            isOneToOne: false;
            referencedRelation: 'notifications';
            referencedColumns: ['notf_id'];
          }
        ];
      };
      messages: {
        Row: {
          created_at: string;
          msg_id: string;
          text: string | null;
        };
        Insert: {
          created_at?: string;
          msg_id: string;
          text?: string | null;
        };
        Update: {
          created_at?: string;
          msg_id?: string;
          text?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          notf_id: string;
          read: boolean;
          text: string | null;
        };
        Insert: {
          created_at?: string;
          notf_id?: string;
          read?: boolean;
          text?: string | null;
        };
        Update: {
          created_at?: string;
          notf_id?: string;
          read?: boolean;
          text?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          role: Database['public']['Enums']['role'] | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          role?: Database['public']['Enums']['role'] | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          role?: Database['public']['Enums']['role'] | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      projects: {
        Row: {
          description: string | null;
          end_date: string | null;
          name: string | null;
          project_id: string;
          project_status: Database['public']['Enums']['project_status'];
          start_date: string;
          team_id: string | null;
        };
        Insert: {
          description?: string | null;
          end_date?: string | null;
          name?: string | null;
          project_id: string;
          project_status?: Database['public']['Enums']['project_status'];
          start_date: string;
          team_id?: string | null;
        };
        Update: {
          description?: string | null;
          end_date?: string | null;
          name?: string | null;
          project_id?: string;
          project_status?: Database['public']['Enums']['project_status'];
          start_date?: string;
          team_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_projects_team-id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['team_id'];
          }
        ];
      };
      tasks: {
        Row: {
          details: string;
          filePath: string | null;
          project_id: string | null;
          status: Database['public']['Enums']['project_status'];
          task_id: number;
          title: string;
        };
        Insert: {
          details: string;
          filePath?: string | null;
          project_id?: string | null;
          status?: Database['public']['Enums']['project_status'];
          task_id?: number;
          title: string;
        };
        Update: {
          details?: string;
          filePath?: string | null;
          project_id?: string | null;
          status?: Database['public']['Enums']['project_status'];
          task_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_tasks_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['project_id'];
          }
        ];
      };
      'team-heads': {
        Row: {
          created_at: string;
          team_head_id: string;
        };
        Insert: {
          created_at?: string;
          team_head_id: string;
        };
        Update: {
          created_at?: string;
          team_head_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_team-heads_team_head_id_fkey';
            columns: ['team_head_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      teamChatRoom: {
        Row: {
          msg_id: string;
          sender_id: string | null;
          team_id: string;
        };
        Insert: {
          msg_id: string;
          sender_id?: string | null;
          team_id: string;
        };
        Update: {
          msg_id?: string;
          sender_id?: string | null;
          team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_teamChatRoom_msg_id_fkey';
            columns: ['msg_id'];
            isOneToOne: false;
            referencedRelation: 'messages';
            referencedColumns: ['msg_id'];
          },
          {
            foreignKeyName: 'public_teamChatRoom_sender_id_fkey';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_teamChatRoom_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['team_id'];
          }
        ];
      };
      teams: {
        Row: {
          created_at: string;
          description: string | null;
          name: string | null;
          projects_done: number | null;
          projects_in_progress: number | null;
          team_head: string | null;
          team_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          name?: string | null;
          projects_done?: number | null;
          projects_in_progress?: number | null;
          team_head?: string | null;
          team_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          name?: string | null;
          projects_done?: number | null;
          projects_in_progress?: number | null;
          team_head?: string | null;
          team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_teams_team_head_fkey';
            columns: ['team_head'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      'teams-members': {
        Row: {
          isTeamHead: boolean;
          member_id: string;
          team_id: string;
        };
        Insert: {
          isTeamHead?: boolean;
          member_id: string;
          team_id: string;
        };
        Update: {
          isTeamHead?: boolean;
          member_id?: string;
          team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_teams-members_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      update_team_projects: {
        Args: {
          x: number;
          row_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      project_status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
      role: 'USER' | 'TEAM_MEMBER' | 'TEAM_HEAD';
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            isOneToOne: false;
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
