export interface IUpdateValueById {
  id: string;
  jobId: string;
  update: Partial<{ isSelected: boolean; value: any }>;
}
