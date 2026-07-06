"use client";

import React, { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";
import Breadcrumbs from "@/components/assignment-detail/Breadcrumbs";
import ProductSpecs from "@/components/assignment-detail/ProductSpecs";
import ProductInfo from "@/components/assignment-detail/ProductInfo";
import RecommendedSection from "@/components/assignment-detail/RecommendedSection";
import { ALL_ASSIGNMENTS } from "@/components/assignments/data";
import { useCart } from "@/context/CartContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AssignmentDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { addToCart } = useCart();

  // Find assignment product
  const product = useMemo(() => {
    return ALL_ASSIGNMENTS.find((item) => item.id === id);
  }, [id]);

  // Recommended assignments (same category, excluding current product)
  const recommendations = useMemo(() => {
    if (!product) return [];
    let list = ALL_ASSIGNMENTS.filter((item) => item.category === product.category && item.id !== product.id);
    // If not enough recommendations in same category, fill with others
    if (list.length < 3) {
      const extra = ALL_ASSIGNMENTS.filter((item) => item.id !== product.id && !list.includes(item));
      list = [...list, ...extra];
    }
    return list.slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <main className="flex-grow flex items-center justify-center p-6 bg-[#FAFBFD] min-h-screen">
        <Card border className="max-w-md text-center p-8 shadow-lg">
          <div className="w-16 h-16 bg-red/10 text-red rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <Heading mainblack bold center className="mb-3">
            Assignment Not Found
          </Heading>
          <Paragraph gray sm center className="mb-6">
            The assignment link you followed could be broken or has been removed.
          </Paragraph>
          <MainButton url="/assignments" className="w-full justify-center">
            Browse Assignments
          </MainButton>
        </Card>
      </main>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      code: product.code,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <main className="flex-grow pt-24 pb-16 bg-[#FAFBFD]">
      
      {/* Breadcrumb section */}
      <Breadcrumbs code={product.code} />

      {/* Product Details Section */}
      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image & Specifications */}
        <div className="lg:col-span-5">
          <ProductSpecs 
            image={product.image} 
            title={product.title} 
            category={product.category} 
            year={product.year} 
            discount={discount} 
          />
        </div>

        {/* Right Column: Title, Prices, Add to Cart & Description Tabs */}
        <div className="lg:col-span-7">
          <ProductInfo 
            code={product.code} 
            title={product.title} 
            rating={product.rating} 
            reviews={product.reviews} 
            price={product.price} 
            oldPrice={product.oldPrice} 
            onBuyNow={handleBuyNow} 
            onAddToCart={handleAddToCart} 
          />
        </div>

      </div>

      {/* Recommended Assignments Section */}
      <RecommendedSection recommendations={recommendations} />

    </main>
  );
}
