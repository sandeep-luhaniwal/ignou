import React from "react";
import { AlertCircle } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import MainButton from "@/components/ui/MainButton";
import { AssignmentProduct } from "./types";
import Card from "@/components/ui/Card";

interface GridProps {
  products: AssignmentProduct[];
  handleResetFilters: () => void;
}

export const AssignmentsGrid: React.FC<GridProps> = ({ products, handleResetFilters }) => {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <Card border className="border-gray-150! py-16 px-6 text-center flex flex-col items-center justify-center ">
        <div className="w-16 h-16 bg-orange/10 text-orange rounded-full flex items-center justify-center mb-5">
          <AlertCircle size={28} />
        </div>
        <h4 className="font-heading text-xl font-bold text-main-black mb-2">No Solved Assignments Found</h4>
        <p className="text-gray text-sm max-w-sm mb-6 leading-relaxed">
          We couldn't find any assignments matching your search queries or active filter values. Try resetting filters.
        </p>
        <MainButton onClick={handleResetFilters}>Reset All Filters</MainButton>
      </Card>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {safeProducts.map((product) => (
        <div key={product.id || (product as any)._id} className="relative group">
          <div className="absolute top-12 left-4 z-10 bg-yellow text-primary font-bold text-sm px-2 py-0.5 rounded-md ">
            {product.year}
          </div>
          <ProductCard
            id={product.id || (product as any)._id}
            code={product.code}
            title={product.title}
            category={product.category}
            price={product.price}
            oldPrice={product.oldPrice}
            image={product.image}
            rating={product.rating}
            reviews={product.reviews}
            slug={(product as any).slug}
          />
        </div>
      ))}
    </div>
  );
};
export default AssignmentsGrid;
