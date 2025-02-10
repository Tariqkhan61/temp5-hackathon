import { defineField, defineType } from "sanity"

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
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 96,
            },
          }),
        {
        name: 'price',
        title: 'Price',
        type: 'number',
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
        },
        {
            name:"category",
            title:"Category",
            type: 'string',
            options:{
                list:[
                   {title: 'Wooden Chair', value: 'wooden chair'},
                   {title: 'Timber Craft', value: 'timber craft'}, 
                   {title: 'BrightSpace', value: 'brightspace'} ,
                   {title: 'Amber Haven', value: 'amber haven'} ,
                   {title: 'Ultimate Fusion', value: 'ultimate fusion'} ,
                ]
            }
        },
        {
            name:"discountPercent",
            title:"Discount Percent",
            type: 'number',
        },
        {
            name:"new",
            type: 'boolean',
            title:"New",
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
        },
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image",
            options: {
              hotspot: true
            },
            fields: [
              {
                name: "alt",
                type: "string",
                title: "Alternative Text",
                validation: (rule) => rule.required(), // Ensure this is required
              }
            ]
          }
        
    ],
})