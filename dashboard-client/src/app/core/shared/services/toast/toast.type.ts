export type IPayloadToastData = {
  status: 'success' | 'error' | 'info';
  summary: string;
  detail: string;
} | null;
