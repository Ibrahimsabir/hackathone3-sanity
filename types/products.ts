export interface Product {
    _id: number;
    name: string;
    stock: number;
    price: string;
    category: string;
    discountPercent: number;
    priceWithoutDiscount: string;
    description: string;
    rating: number;
    imageUrl: {
      _type: "image"; // Sanity image type
      asset: {
        _ref: string; // Reference to the image in Sanity
        _type: "reference"; // Type of the reference
      };
    };
    isnew: boolean;
    slug: {
      _type: "slug"; // Sanity slug type
      current: string; // The actual slug value (e.g., "some-product-name")
    };
  }
  
export interface Category {
    params: {category : string}
}