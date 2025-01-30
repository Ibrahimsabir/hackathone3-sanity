import { groq } from "next-sanity";

export const allproducts = groq`*[_type == "products"]{
    _id,
    name,
    slug,
    description,
    price,
    discountPercent,
    priceWithoutDiscount,
    rating,
    color,
    "imageUrl": image.asset->url,
    isnew,
}`;

export const newarrivals = groq`*[_type == "products" && isnew]{
     _id,
    name,
    slug,
    description,
    price,
    discountPercent,
    priceWithoutDiscount,
    rating,
    color,
    isnew,
    "imageUrl": image.asset->url,
    }`

    
    export const productyoulike = groq`*[_type == "products" && (discountPercent > 10)]{
        _id,
       name,
       slug,
       description,
       price,
       discountPercent,
       priceWithoutDiscount,
       rating,
       color,
       isnew,
       "imageUrl": image.asset->url,
       }`

       export const topseller = groq`*[_type == "products" && rating > 4]{
        _id,
       name,
       slug,
       description,
       price,
       discountPercent,
       priceWithoutDiscount,
       rating,
       color,
       isnew,
       "imageUrl": image.asset->url,
       }`