export interface AssignmentProduct {
  id: string;
  title: string;
  category: string; // e.g. BCA, MCA, MBA, BA
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  year: string; // e.g. "2025-26", "2024-25"
  code: string; // e.g. "MCS-011"
}
