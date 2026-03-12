export interface Resource {
  id: string;
  service_name: string;
  description: string;
  category: string;
  subcategory: string[];
  university: string;
  province: string;
  city: string;
  contact_phone?: string;
  email?: string;
  website_url?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  eligibility?: string[];
  keywords: string[];
  priority: number;
  created_at: string;
}

export interface ChatResponse {
  reply: string;
  resources: Resource[];
  needs_clarification: boolean;
  clarifying_question?: string;
  classification?: AIClassification;
}

export interface AIClassification {
  needs: string[];
  province: string;
  university: string;
  urgency: 'low' | 'medium' | 'high';
  needs_clarification: boolean;
  clarifying_question: string;
}
