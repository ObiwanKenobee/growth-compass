export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      acquisition_channels: {
        Row: {
          cac: number
          color: string | null
          created_at: string
          customers: number
          id: string
          name: string
          period_month: string
        }
        Insert: {
          cac?: number
          color?: string | null
          created_at?: string
          customers?: number
          id?: string
          name: string
          period_month: string
        }
        Update: {
          cac?: number
          color?: string | null
          created_at?: string
          customers?: number
          id?: string
          name?: string
          period_month?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          changed_at: string
          changed_by: string | null
          id: string
          new_data: Json | null
          old_data: Json | null
          record_id: string
          table_name: string
        }
        Insert: {
          action: string
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id: string
          table_name: string
        }
        Update: {
          action?: string
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string
          table_name?: string
        }
        Relationships: []
      }
      cohort_retention: {
        Row: {
          cohort_label: string
          created_at: string
          id: string
          month_index: number
          retention_pct: number
        }
        Insert: {
          cohort_label: string
          created_at?: string
          id?: string
          month_index: number
          retention_pct: number
        }
        Update: {
          cohort_label?: string
          created_at?: string
          id?: string
          month_index?: number
          retention_pct?: number
        }
        Relationships: []
      }
      competitive_analysis: {
        Row: {
          competitor_name: string
          created_at: string
          id: string
          losses: number
          period_month: string
          top_reason: string
          wins: number
        }
        Insert: {
          competitor_name: string
          created_at?: string
          id?: string
          losses?: number
          period_month: string
          top_reason?: string
          wins?: number
        }
        Update: {
          competitor_name?: string
          created_at?: string
          id?: string
          losses?: number
          period_month?: string
          top_reason?: string
          wins?: number
        }
        Relationships: []
      }
      customer_health: {
        Row: {
          contract_end: string | null
          contract_start: string | null
          created_at: string
          feature_adoption_pct: number | null
          id: string
          last_activity_date: string | null
          name: string
          nps_score: number | null
          reason: string
          revenue: number
          score: number
          status: string
          support_tickets_open: number | null
        }
        Insert: {
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string
          feature_adoption_pct?: number | null
          id?: string
          last_activity_date?: string | null
          name: string
          nps_score?: number | null
          reason?: string
          revenue?: number
          score?: number
          status?: string
          support_tickets_open?: number | null
        }
        Update: {
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string
          feature_adoption_pct?: number | null
          id?: string
          last_activity_date?: string | null
          name?: string
          nps_score?: number | null
          reason?: string
          revenue?: number
          score?: number
          status?: string
          support_tickets_open?: number | null
        }
        Relationships: []
      }
      customer_segments: {
        Row: {
          churn_rate: number
          contract_value: number
          created_at: string
          customer_count: number
          growth_rate: number
          id: string
          ltv: number
          name: string
          period_month: string
        }
        Insert: {
          churn_rate?: number
          contract_value?: number
          created_at?: string
          customer_count?: number
          growth_rate?: number
          id?: string
          ltv?: number
          name: string
          period_month: string
        }
        Update: {
          churn_rate?: number
          contract_value?: number
          created_at?: string
          customer_count?: number
          growth_rate?: number
          id?: string
          ltv?: number
          name?: string
          period_month?: string
        }
        Relationships: []
      }
      dashboard_metrics: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          metric_type: string
          period_month: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_type: string
          period_month: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_type?: string
          period_month?: string
          value?: number
        }
        Relationships: []
      }
      expansion_revenue: {
        Row: {
          created_at: string
          geo_expansion: number
          id: string
          new_services: number
          period_month: string
          tier_upgrades: number
          total: number
        }
        Insert: {
          created_at?: string
          geo_expansion?: number
          id?: string
          new_services?: number
          period_month: string
          tier_upgrades?: number
          total?: number
        }
        Update: {
          created_at?: string
          geo_expansion?: number
          id?: string
          new_services?: number
          period_month?: string
          tier_upgrades?: number
          total?: number
        }
        Relationships: []
      }
      financial_data: {
        Row: {
          color: string | null
          created_at: string
          data_type: string
          id: string
          label: string
          metadata: Json | null
          percentage: number | null
          period_month: string
          value: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          data_type: string
          id?: string
          label: string
          metadata?: Json | null
          percentage?: number | null
          period_month: string
          value?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          data_type?: string
          id?: string
          label?: string
          metadata?: Json | null
          percentage?: number | null
          period_month?: string
          value?: number
        }
        Relationships: []
      }
      funnel_stages: {
        Row: {
          conversion_rate: number
          count: number
          created_at: string
          id: string
          period_month: string
          stage_name: string
          stage_order: number
        }
        Insert: {
          conversion_rate?: number
          count?: number
          created_at?: string
          id?: string
          period_month: string
          stage_name: string
          stage_order: number
        }
        Update: {
          conversion_rate?: number
          count?: number
          created_at?: string
          id?: string
          period_month?: string
          stage_name?: string
          stage_order?: number
        }
        Relationships: []
      }
      nrr_tracking: {
        Row: {
          churn: number
          contraction: number
          created_at: string
          expansion: number
          id: string
          nrr_value: number
          period_month: string
          target: number
        }
        Insert: {
          churn?: number
          contraction?: number
          created_at?: string
          expansion?: number
          id?: string
          nrr_value: number
          period_month: string
          target?: number
        }
        Update: {
          churn?: number
          contraction?: number
          created_at?: string
          expansion?: number
          id?: string
          nrr_value?: number
          period_month?: string
          target?: number
        }
        Relationships: []
      }
      pipeline_velocity: {
        Row: {
          avg_cycle_time: number
          avg_deal_size: number
          created_at: string
          deals_lost: number
          deals_won: number
          id: string
          period_month: string
          velocity: number
          win_rate: number
        }
        Insert: {
          avg_cycle_time?: number
          avg_deal_size?: number
          created_at?: string
          deals_lost?: number
          deals_won?: number
          id?: string
          period_month: string
          velocity?: number
          win_rate?: number
        }
        Update: {
          avg_cycle_time?: number
          avg_deal_size?: number
          created_at?: string
          deals_lost?: number
          deals_won?: number
          id?: string
          period_month?: string
          velocity?: number
          win_rate?: number
        }
        Relationships: []
      }
      revenue_concentration: {
        Row: {
          contract_end: string | null
          contract_start: string | null
          created_at: string
          customer_name: string
          growth_trend: number | null
          id: string
          revenue: number
          revenue_pct: number
          risk_level: string | null
          segment: string | null
        }
        Insert: {
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string
          customer_name: string
          growth_trend?: number | null
          id?: string
          revenue?: number
          revenue_pct?: number
          risk_level?: string | null
          segment?: string | null
        }
        Update: {
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string
          customer_name?: string
          growth_trend?: number | null
          id?: string
          revenue?: number
          revenue_pct?: number
          risk_level?: string | null
          segment?: string | null
        }
        Relationships: []
      }
      strategic_intel: {
        Row: {
          created_at: string
          event_date: string
          id: string
          impact: string
          intel_type: string
          title: string
        }
        Insert: {
          created_at?: string
          event_date: string
          id?: string
          impact?: string
          intel_type: string
          title: string
        }
        Update: {
          created_at?: string
          event_date?: string
          id?: string
          impact?: string
          intel_type?: string
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
