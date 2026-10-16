// Shared: the worksheets catalog, the cart store and checkout all read this.
export interface WorksheetAuthor {
  id: string;
  fullName: string;
}

export interface Worksheet {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  gradeLevel: string;
  subject: string;
  previewImageUrl: string;
  author: WorksheetAuthor;
  createdAt: string;
  updatedAt: string;
}
