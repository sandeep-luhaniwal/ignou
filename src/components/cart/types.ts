export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  code: string;
  quantity: number;
}
