import { defineType  } from "sanity"

export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
        name: 'name',
        title: 'Name',
        type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options : {
                source : 'name',
                maxLength: 40,
            
            }
            },
            {
                name: 'stock',
                title: 'Stock',
                type: 'number',
                },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(5), // Ensure rating is between 0 and 5
            },
        {
        name: 'price',
        title: 'Price',
        type: 'string',
        },
        {
        name: 'description',
        title: 'Description',
        type: 'text',
        },
        {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
            hotspot: true,
            
                 }
        },
        {
            name:"category",
            title:"Category",
            type: 'string',
            options:{
                list:[
                   {title: 'Casual', value: 'casual'},
                   {title: 'Party Ware', value: 'partyware'}, 
                   {title: 'Gym', value: 'gym'} ,
                   {title: 'Formal', value: 'formal'} ,
                //    {title: 'T-Shirt', value: 'tshirt'} ,
                //    {title: 'Short', value: 'short'} ,
                //    {title: 'Jeans', value: 'jeans'} ,
                //    {title: 'Hoodie', value: 'hoodie'} ,
                //    {title: 'Shirt', value: 'shirt'} ,
                ]
            }
        },
        {
            name:"discountPercent",
            title:"Discount Percent",
            type: 'number',
        },
        {
            name:"isnew",
            type: 'boolean',
            title:"isNew",
        },
        {
            name:"colors",
            title:"Colors",
            type: 'array',
            of:[
                {type: 'string'}
            ]
        },
        {
            name:"sizes",
            title:"Sizes",
            type: 'array',
            of:[
                {type: 'string'}
            ]
        }
    ],
})