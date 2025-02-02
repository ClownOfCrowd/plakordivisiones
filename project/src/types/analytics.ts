export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface UserData {
  userId?: string;
  sessionId: string;
  timestamp: number;
  page: string;
  referrer?: string;
} 