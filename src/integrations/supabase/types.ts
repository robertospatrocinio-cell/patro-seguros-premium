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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      claims: {
        Row: {
          carrier: string | null
          claim_date: string
          claim_number: string | null
          client_id: string | null
          created_at: string
          deductible_amount: number | null
          description: string | null
          has_third_party: boolean | null
          id: string
          location: string | null
          notification_date: string | null
          policy_number: string | null
          status: string | null
          third_party_count: number | null
          third_party_name: string | null
          third_party_phone: string | null
          tracking_notes: string | null
          updated_at: string
          workshop: string | null
        }
        Insert: {
          carrier?: string | null
          claim_date?: string
          claim_number?: string | null
          client_id?: string | null
          created_at?: string
          deductible_amount?: number | null
          description?: string | null
          has_third_party?: boolean | null
          id?: string
          location?: string | null
          notification_date?: string | null
          policy_number?: string | null
          status?: string | null
          third_party_count?: number | null
          third_party_name?: string | null
          third_party_phone?: string | null
          tracking_notes?: string | null
          updated_at?: string
          workshop?: string | null
        }
        Update: {
          carrier?: string | null
          claim_date?: string
          claim_number?: string | null
          client_id?: string | null
          created_at?: string
          deductible_amount?: number | null
          description?: string | null
          has_third_party?: boolean | null
          id?: string
          location?: string | null
          notification_date?: string | null
          policy_number?: string | null
          status?: string | null
          third_party_count?: number | null
          third_party_name?: string | null
          third_party_phone?: string | null
          tracking_notes?: string | null
          updated_at?: string
          workshop?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_insurances: {
        Row: {
          contact_id: string | null
          created_at: string | null
          id: string
          insurance_type: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          insurance_type: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          insurance_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_insurances_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          address: string | null
          birth_date: string | null
          business_insurance_carrier: string | null
          business_insurance_renewal: string | null
          car_count: number | null
          children_count: number | null
          children_data: Json | null
          client_type: string | null
          consortium_carrier: string | null
          consortium_renewal: string | null
          consortium_type: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          first_license_date: string | null
          full_name: string
          has_business_insurance: boolean | null
          has_children: boolean | null
          has_consortium: boolean | null
          has_home_insurance: boolean | null
          has_life_insurance: boolean | null
          has_motorcycle: boolean | null
          has_other_insurance: boolean | null
          health_insurance_carrier: string | null
          health_insurance_renewal: string | null
          health_plan_type: string | null
          home_insurance_carrier: string | null
          home_insurance_renewal: string | null
          home_ownership: string | null
          id: string
          income_bracket: string | null
          is_client: boolean | null
          last_contact_date: string | null
          last_interaction_type: string | null
          lead_source: string | null
          life_insurance_carrier: string | null
          life_insurance_renewal: string | null
          marital_status: string | null
          next_contact_date: string | null
          notes: string | null
          opportunities: string[] | null
          opportunity_notes: string | null
          other_insurance_carrier: string | null
          other_insurance_renewal: string | null
          partner_birthday: string | null
          partner_name: string | null
          partner_source_name: string | null
          phone: string | null
          profession: string | null
          property_type: string | null
          referral_contact_id: string | null
          responsible_name: string | null
          salesperson_name: string | null
          satisfaction_score: number | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          business_insurance_carrier?: string | null
          business_insurance_renewal?: string | null
          car_count?: number | null
          children_count?: number | null
          children_data?: Json | null
          client_type?: string | null
          consortium_carrier?: string | null
          consortium_renewal?: string | null
          consortium_type?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          first_license_date?: string | null
          full_name: string
          has_business_insurance?: boolean | null
          has_children?: boolean | null
          has_consortium?: boolean | null
          has_home_insurance?: boolean | null
          has_life_insurance?: boolean | null
          has_motorcycle?: boolean | null
          has_other_insurance?: boolean | null
          health_insurance_carrier?: string | null
          health_insurance_renewal?: string | null
          health_plan_type?: string | null
          home_insurance_carrier?: string | null
          home_insurance_renewal?: string | null
          home_ownership?: string | null
          id?: string
          income_bracket?: string | null
          is_client?: boolean | null
          last_contact_date?: string | null
          last_interaction_type?: string | null
          lead_source?: string | null
          life_insurance_carrier?: string | null
          life_insurance_renewal?: string | null
          marital_status?: string | null
          next_contact_date?: string | null
          notes?: string | null
          opportunities?: string[] | null
          opportunity_notes?: string | null
          other_insurance_carrier?: string | null
          other_insurance_renewal?: string | null
          partner_birthday?: string | null
          partner_name?: string | null
          partner_source_name?: string | null
          phone?: string | null
          profession?: string | null
          property_type?: string | null
          referral_contact_id?: string | null
          responsible_name?: string | null
          salesperson_name?: string | null
          satisfaction_score?: number | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          business_insurance_carrier?: string | null
          business_insurance_renewal?: string | null
          car_count?: number | null
          children_count?: number | null
          children_data?: Json | null
          client_type?: string | null
          consortium_carrier?: string | null
          consortium_renewal?: string | null
          consortium_type?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          first_license_date?: string | null
          full_name?: string
          has_business_insurance?: boolean | null
          has_children?: boolean | null
          has_consortium?: boolean | null
          has_home_insurance?: boolean | null
          has_life_insurance?: boolean | null
          has_motorcycle?: boolean | null
          has_other_insurance?: boolean | null
          health_insurance_carrier?: string | null
          health_insurance_renewal?: string | null
          health_plan_type?: string | null
          home_insurance_carrier?: string | null
          home_insurance_renewal?: string | null
          home_ownership?: string | null
          id?: string
          income_bracket?: string | null
          is_client?: boolean | null
          last_contact_date?: string | null
          last_interaction_type?: string | null
          lead_source?: string | null
          life_insurance_carrier?: string | null
          life_insurance_renewal?: string | null
          marital_status?: string | null
          next_contact_date?: string | null
          notes?: string | null
          opportunities?: string[] | null
          opportunity_notes?: string | null
          other_insurance_carrier?: string | null
          other_insurance_renewal?: string | null
          partner_birthday?: string | null
          partner_name?: string | null
          partner_source_name?: string | null
          phone?: string | null
          profession?: string | null
          property_type?: string | null
          referral_contact_id?: string | null
          responsible_name?: string | null
          salesperson_name?: string | null
          satisfaction_score?: number | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_referral_contact_id_fkey"
            columns: ["referral_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_click_events: {
        Row: {
          analytics_loaded: boolean
          created_at: string
          event_type: string
          id: string
          insurance_type: string | null
          landing_page: string | null
          origin: string | null
          page_path: string | null
          referrer: string | null
          seconds_since_page_start: number | null
          session_id: string | null
          source: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          analytics_loaded?: boolean
          created_at?: string
          event_type: string
          id?: string
          insurance_type?: string | null
          landing_page?: string | null
          origin?: string | null
          page_path?: string | null
          referrer?: string | null
          seconds_since_page_start?: number | null
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          analytics_loaded?: boolean
          created_at?: string
          event_type?: string
          id?: string
          insurance_type?: string | null
          landing_page?: string | null
          origin?: string | null
          page_path?: string | null
          referrer?: string | null
          seconds_since_page_start?: number | null
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      crm_notifications: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_notifications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_responsible_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          customer_id: string
          id: string
          new_user_id: string | null
          previous_user_id: string | null
          role: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          customer_id: string
          id?: string
          new_user_id?: string | null
          previous_user_id?: string | null
          role: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          customer_id?: string
          id?: string
          new_user_id?: string | null
          previous_user_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_responsible_history_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address_city: string | null
          address_complement: string | null
          address_neighborhood: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          assigned_attendant_id: string | null
          assigned_consultant_id: string | null
          assigned_manager_id: string | null
          birth_date: string | null
          client_profile: string | null
          client_type: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          last_interaction_at: string | null
          notes: string | null
          phone: string | null
          relationship_score: number | null
          relationship_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          assigned_attendant_id?: string | null
          assigned_consultant_id?: string | null
          assigned_manager_id?: string | null
          birth_date?: string | null
          client_profile?: string | null
          client_type?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          last_interaction_at?: string | null
          notes?: string | null
          phone?: string | null
          relationship_score?: number | null
          relationship_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address_city?: string | null
          address_complement?: string | null
          address_neighborhood?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          assigned_attendant_id?: string | null
          assigned_consultant_id?: string | null
          assigned_manager_id?: string | null
          birth_date?: string | null
          client_profile?: string | null
          client_type?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          last_interaction_at?: string | null
          notes?: string | null
          phone?: string | null
          relationship_score?: number | null
          relationship_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          contact_id: string | null
          created_at: string | null
          customer_id: string | null
          external_drive_link: string | null
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          policy_id: string | null
        }
        Insert: {
          category?: string | null
          contact_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          external_drive_link?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          policy_id?: string | null
        }
        Update: {
          category?: string | null
          contact_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          external_drive_link?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          policy_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      insurance_sales: {
        Row: {
          amount: number
          carrier: string
          created_at: string
          id: string
          insurance_type: string
          sale_date: string
          updated_at: string
        }
        Insert: {
          amount?: number
          carrier: string
          created_at?: string
          id?: string
          insurance_type: string
          sale_date?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          carrier?: string
          created_at?: string
          id?: string
          insurance_type?: string
          sale_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      interactions: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          interaction_date: string | null
          next_contact_date: string | null
          notes: string | null
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          interaction_date?: string | null
          next_contact_date?: string | null
          notes?: string | null
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          interaction_date?: string | null
          next_contact_date?: string | null
          notes?: string | null
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      kanban_stages: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          order_index: number
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          order_index?: number
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      lead_quote_history: {
        Row: {
          created_at: string | null
          field_changed: string | null
          id: string
          new_value: string | null
          partial_quote_id: string | null
          previous_value: string | null
          snapshot: Json | null
          step_reached: number
        }
        Insert: {
          created_at?: string | null
          field_changed?: string | null
          id?: string
          new_value?: string | null
          partial_quote_id?: string | null
          previous_value?: string | null
          snapshot?: Json | null
          step_reached: number
        }
        Update: {
          created_at?: string | null
          field_changed?: string | null
          id?: string
          new_value?: string | null
          partial_quote_id?: string | null
          previous_value?: string | null
          snapshot?: Json | null
          step_reached?: number
        }
        Relationships: [
          {
            foreignKeyName: "lead_quote_history_partial_quote_id_fkey"
            columns: ["partial_quote_id"]
            isOneToOne: false
            referencedRelation: "partial_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          city: string | null
          client_type: string | null
          cpf_cnpj: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          insurance_type: string | null
          ip_address: string | null
          kanban_order: number | null
          kanban_stage_id: string | null
          lead_score: number | null
          lead_status: string | null
          notes: string | null
          phone: string | null
          raw_data: Json | null
          responsible_name: string | null
          source_origin: string | null
          source_page: string | null
          state: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          assigned_to?: string | null
          city?: string | null
          client_type?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          insurance_type?: string | null
          ip_address?: string | null
          kanban_order?: number | null
          kanban_stage_id?: string | null
          lead_score?: number | null
          lead_status?: string | null
          notes?: string | null
          phone?: string | null
          raw_data?: Json | null
          responsible_name?: string | null
          source_origin?: string | null
          source_page?: string | null
          state?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          assigned_to?: string | null
          city?: string | null
          client_type?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          insurance_type?: string | null
          ip_address?: string | null
          kanban_order?: number | null
          kanban_stage_id?: string | null
          lead_score?: number | null
          lead_status?: string | null
          notes?: string | null
          phone?: string | null
          raw_data?: Json | null
          responsible_name?: string | null
          source_origin?: string | null
          source_page?: string | null
          state?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_kanban_stage_id_fkey"
            columns: ["kanban_stage_id"]
            isOneToOne: false
            referencedRelation: "kanban_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      pagespeed_audits: {
        Row: {
          accessibility_score: number | null
          best_practices_score: number | null
          cls: number | null
          created_at: string
          fcp_ms: number | null
          id: string
          lcp_ms: number | null
          performance_score: number | null
          seo_score: number | null
          speed_index_ms: number | null
          strategy: string
          tbt_ms: number | null
          url: string
        }
        Insert: {
          accessibility_score?: number | null
          best_practices_score?: number | null
          cls?: number | null
          created_at?: string
          fcp_ms?: number | null
          id?: string
          lcp_ms?: number | null
          performance_score?: number | null
          seo_score?: number | null
          speed_index_ms?: number | null
          strategy: string
          tbt_ms?: number | null
          url: string
        }
        Update: {
          accessibility_score?: number | null
          best_practices_score?: number | null
          cls?: number | null
          created_at?: string
          fcp_ms?: number | null
          id?: string
          lcp_ms?: number | null
          performance_score?: number | null
          seo_score?: number | null
          speed_index_ms?: number | null
          strategy?: string
          tbt_ms?: number | null
          url?: string
        }
        Relationships: []
      }
      partial_quotes: {
        Row: {
          created_at: string | null
          current_step: number | null
          data: Json | null
          email: string | null
          id: string
          insurance_type: string | null
          last_activity: string | null
          name: string | null
          phone: string | null
          reminder_sent_count: number | null
        }
        Insert: {
          created_at?: string | null
          current_step?: number | null
          data?: Json | null
          email?: string | null
          id?: string
          insurance_type?: string | null
          last_activity?: string | null
          name?: string | null
          phone?: string | null
          reminder_sent_count?: number | null
        }
        Update: {
          created_at?: string | null
          current_step?: number | null
          data?: Json | null
          email?: string | null
          id?: string
          insurance_type?: string | null
          last_activity?: string | null
          name?: string | null
          phone?: string | null
          reminder_sent_count?: number | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          commission_amount: number | null
          created_at: string | null
          customer_id: string | null
          end_date: string | null
          id: string
          installments_paid: number | null
          installments_total: number | null
          insurance_type: string
          insurer_name: string | null
          is_renewal: boolean | null
          notes: string | null
          payment_status: string | null
          policy_number: string | null
          premium_amount: number | null
          renewal_from_id: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          commission_amount?: number | null
          created_at?: string | null
          customer_id?: string | null
          end_date?: string | null
          id?: string
          installments_paid?: number | null
          installments_total?: number | null
          insurance_type: string
          insurer_name?: string | null
          is_renewal?: boolean | null
          notes?: string | null
          payment_status?: string | null
          policy_number?: string | null
          premium_amount?: number | null
          renewal_from_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_amount?: number | null
          created_at?: string | null
          customer_id?: string | null
          end_date?: string | null
          id?: string
          installments_paid?: number | null
          installments_total?: number | null
          insurance_type?: string
          insurer_name?: string | null
          is_renewal?: boolean | null
          notes?: string | null
          payment_status?: string | null
          policy_number?: string | null
          premium_amount?: number | null
          renewal_from_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_renewal_from_id_fkey"
            columns: ["renewal_from_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      purge_logs: {
        Row: {
          action: string
          created_at: string
          error_message: string | null
          id: string
          purged_urls: string[] | null
          results: Json | null
          success: boolean
          tags: string[] | null
          total_urls: number
        }
        Insert: {
          action: string
          created_at?: string
          error_message?: string | null
          id?: string
          purged_urls?: string[] | null
          results?: Json | null
          success?: boolean
          tags?: string[] | null
          total_urls?: number
        }
        Update: {
          action?: string
          created_at?: string
          error_message?: string | null
          id?: string
          purged_urls?: string[] | null
          results?: Json | null
          success?: boolean
          tags?: string[] | null
          total_urls?: number
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          count: number
          created_at: string
          id: string
          key: string
          reset_at: string
        }
        Insert: {
          count?: number
          created_at?: string
          id?: string
          key: string
          reset_at: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: string
          key?: string
          reset_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          conversion_date: string | null
          created_at: string | null
          id: string
          insurance_type_interest: string | null
          referred_email: string | null
          referred_name: string
          referred_phone: string | null
          referrer_customer_id: string | null
          reward_given: boolean | null
          status: string | null
        }
        Insert: {
          conversion_date?: string | null
          created_at?: string | null
          id?: string
          insurance_type_interest?: string | null
          referred_email?: string | null
          referred_name: string
          referred_phone?: string | null
          referrer_customer_id?: string | null
          reward_given?: boolean | null
          status?: string | null
        }
        Update: {
          conversion_date?: string | null
          created_at?: string | null
          id?: string
          insurance_type_interest?: string | null
          referred_email?: string | null
          referred_name?: string
          referred_phone?: string | null
          referrer_customer_id?: string | null
          reward_given?: boolean | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_customer_id_fkey"
            columns: ["referrer_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      relationship_rules: {
        Row: {
          alert_threshold_days: number
          created_at: string | null
          id: string
          interaction_interval_days: number
          profile: string
          updated_at: string | null
        }
        Insert: {
          alert_threshold_days: number
          created_at?: string | null
          id?: string
          interaction_interval_days: number
          profile: string
          updated_at?: string | null
        }
        Update: {
          alert_threshold_days?: number
          created_at?: string | null
          id?: string
          interaction_interval_days?: number
          profile?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      schema_audits: {
        Row: {
          errors: Json | null
          executed_at: string
          has_breadcrumb: boolean
          has_faq: boolean
          has_rating: boolean
          id: string
          page_path: string
        }
        Insert: {
          errors?: Json | null
          executed_at?: string
          has_breadcrumb?: boolean
          has_faq?: boolean
          has_rating?: boolean
          id?: string
          page_path: string
        }
        Update: {
          errors?: Json | null
          executed_at?: string
          has_breadcrumb?: boolean
          has_faq?: boolean
          has_rating?: boolean
          id?: string
          page_path?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          customer_id: string | null
          description: string | null
          due_date: string | null
          id: string
          lead_id: string | null
          policy_id: string | null
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string | null
          policy_id?: string | null
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string | null
          policy_id?: string | null
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
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
      whatsapp_history: {
        Row: {
          attachment_url: string | null
          customer_id: string | null
          direction: string
          id: string
          lead_id: string | null
          message_body: string | null
          message_type: string | null
          sent_at: string | null
        }
        Insert: {
          attachment_url?: string | null
          customer_id?: string | null
          direction: string
          id?: string
          lead_id?: string | null
          message_body?: string | null
          message_type?: string | null
          sent_at?: string | null
        }
        Update: {
          attachment_url?: string | null
          customer_id?: string | null
          direction?: string
          id?: string
          lead_id?: string | null
          message_body?: string | null
          message_type?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_history_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: { Args: { data: string }; Returns: string }
      check_rate_limit: {
        Args: {
          p_key: string
          p_max_requests: number
          p_window_seconds: number
        }
        Returns: boolean
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "http_request"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_get:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
        SetofOptions: {
          from: "*"
          to: "http_header"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_list_curlopt: {
        Args: never
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_post:
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_reset_curlopt: { Args: never; Returns: boolean }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      text_to_bytea: { Args: { data: string }; Returns: string }
      trigger_quote_reminders: { Args: never; Returns: undefined }
      urlencode:
        | { Args: { data: Json }; Returns: string }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
      app_role: ["admin", "user"],
    },
  },
} as const
