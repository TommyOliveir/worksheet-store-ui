export interface Worksheet {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  gradeLevel: string;
  subject: string;
  previewImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorksheetFilterParams {
  query?: string;
  gradeLevel?: string;
  subject?: string;
  page?: number;
  limit?: number;
}
