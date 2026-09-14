export type StartingPoint = "idea" | "started" | "existing" | "running";

export type ApiFailureBody = {
  status: "error";
  error: string;
  message?: string;
};

export type JourneyRecord<T extends Record<string, unknown>> = {
  record_id: string;
  kind: string;
  knowledge_class: string;
  confidence: number | null;
  data: T;
  version: number;
};

export type ResearchSource = {
  source_id: string;
  publisher: string;
  title: string;
  url: string;
  observed_at: string;
};

export type Recommendation = {
  state: string;
  target_customer: { description: string; responsibility: string };
  service_area: { center: string; radius_miles: number; outside_area_behavior: string; responsibility: string };
  offers: Array<Record<string, unknown> & { offer_id: string; name: string; responsibility: string }>;
  starting_price_logic: { formula: string; rules: string[]; responsibility: string };
  positioning: { statement: string; prohibited_unverified_claims: string[]; responsibility: string };
  risks: string[];
  startup_admin_requirements: Array<{ requirement: string; responsibility: string; authority: string }>;
  recommended_systems: Array<{ system: string; responsibility: string; authority?: string }>;
  approval_effect: string;
};

export type EvidenceSubmission = {
  submission_id: string;
  action_id: string;
  evidence_type: string;
  source: string;
  safe_filename: string | null;
  content_type: string | null;
  size_bytes: number | null;
  content_sha256: string;
  scan_state: "pending_scan" | "clean" | "rejected" | "not_applicable";
  submitted_at: string;
  expires_at: string | null;
  revoked: boolean;
  supersedes_submission_id: string | null;
  review_state: "pending_review" | "accepted" | "rejected" | "more_evidence_required";
  review_reason: string | null;
};

export type EvidenceReview = {
  review_id: string;
  submission_ids: string[];
  decision: "accepted" | "rejected" | "more_evidence_required";
  reason_code: string;
  requested_additional_evidence: string[];
  reviewed_at: string;
  review_version: number;
  supersedes_review_id: string | null;
  active: boolean;
};

export type FounderAction = {
  founder_action_id: string;
  action_key?: string;
  title: string;
  reason: string;
  instructions: string[];
  state: "prepared" | "explained" | "linked" | "founder_completed" | "result_captured" | "verified" | string;
  responsibility: string;
  partner_authority?: string | null;
  required_evidence_kinds: string[];
  prepared_data?: { checklist?: string[]; [key: string]: unknown };
  destination?: { label?: string; url?: string; mode?: string; [key: string]: unknown };
  verification?: { authority?: string; state?: string; result?: string; [key: string]: unknown };
  evidence_review?: {
    submissions: EvidenceSubmission[];
    reviews: EvidenceReview[];
    review_state: string;
  };
  version: number;
};

export type ResidentialCleaningJourney = {
  pilot: string;
  company: {
    company_id: string;
    display_name: string;
    archetype: string;
    jurisdiction: Record<string, string>;
    lifecycle: string;
    readiness: string;
  };
  founder: { user_id: string; organization_id: string; membership_id: string; role: string };
  intake: JourneyRecord<Record<string, unknown> & { starting_point: StartingPoint }>;
  research: JourneyRecord<{
    status: string;
    limitations: string[];
    sources: ResearchSource[];
    findings: Array<{ finding_id: string; statement: string; source_ids: string[] }>;
    open_research: Array<{ task: string; responsibility: string }>;
  }>;
  recommendation: JourneyRecord<Recommendation>;
  scope_commit: {
    state: string;
    job_id: string;
    job_status: string;
    approval_id: string;
    approval_state: string;
  };
  order: null | { order_id: string; product_code: string; status: string; mode: string };
  entitlements: Array<{ entitlement_id: string; code: string; class: string; status: string }>;
  founder_actions: FounderAction[];
  verification: {
    authority: "verification";
    ready: boolean;
    fully_set: boolean;
    unmet_ready: string[];
    unmet_fully_set: string[];
    blocking_ids: string[];
    evaluated_at: string;
  };
};

export type BuildRoomProjection = {
  schema_version: string;
  generated_at: string;
  company: { company_id: string; display_name: string; lifecycle: string; [key: string]: unknown };
  summary: { total: number; complete: number; active: number; blocked: number; progress_percent: number };
  readiness: { ready: boolean; fully_set: boolean; unmet_ready: string[]; unmet_fully_set: string[]; explanation: string };
  work_items: Array<{ id: string; kind: string; title: string; description: string; owner: string; status: string; status_group: string }>;
  approvals: Array<{ approval_id: string; title: string; summary: string; state: string; required_approver_role: string }>;
  founder_actions: FounderAction[];
  handoff: { state: string; authority: string; verification_id: string | null };
};

export type SessionStatus = {
  authenticated: boolean;
  user: { user_id: string; email: string; status: string; email_verified: boolean };
  memberships: Array<{ membership_id: string; organization_id: string; role: string; status: string }>;
};
