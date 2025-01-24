import { defineQuery } from "next-sanity";
import { groq } from "next-sanity";
export const allproducts = groq`*[_type == "product"]{
    _id,
    name,
    description,
    price,
    discountPercentage,
    priceWithoutDiscount,
    rating,
    color,
    "imageUrl": image.asset->url,
    isnew,
}`;

export const newarrivals = groq`*[_type == "product" && isnew]{
     _id,
    name,
    description,
    price,
    discountpercentage,
    priceWithoutDiscount,
    rating,
    color,
    isnew,
    "imageUrl": image.asset->url,
    }`