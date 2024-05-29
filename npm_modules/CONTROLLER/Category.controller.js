import { response } from "express";
import Category from "../MODEL/category.model.js";
import {Favourite_product, Product, ProductFeedback} from "../MODEL/product.model.js";
import { ProductImage } from "../MODEL/product.model.js";
import xlsx from "xlsx"

export const addcategoryExcel = async (request,response,next)=>{
    const workbook = xlsx.readFile('Categories.xlsx');

    const sheet_name = workbook.SheetNames[0];
    const  sheet = workbook.Sheets[sheet_name];
    console.log(request.body);

    // convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);

    try{
        for (let item of data) {
        let category_name = item.category_name;
        let category_image = item.category_image

        console.log(category_name + " " + category_image);
        await Category.create({
            category_name,category_image
        });
    }
    return response.status(200).json({message : 'Category Added...'});
} catch(err){
    console.log(err);
    return response.status(501).json({ error: "Internal server error" });
}
}


export const addProductExcel = async (request,response,next)=>{
    // const workbook = xlsx.readFile('Products entry.xlsx');
    // const workbook = xlsx.readFile('painting163.xlsx');
    // const workbook = xlsx.readFile('table data.xlsx');



    const sheet_name = workbook.SheetNames[0];
    const  sheet = workbook.Sheets[sheet_name];
    console.log(request.body);

    // convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);

    try{
        for (let item of data) {
        let professional_id = item.professional_id;
        let category_id = item.category_id;
        let price = item.price;
        let title = item.title;
        let description = item.description;
        let stock = item.stock;
        let cancle_price = item.cancle_price
        console.log(professional_id + " " + category_id+" "+price+" "+title+" "+" "+description+" "+stock+" "+cancle_price);
        await Product.create({
            professional_id,category_id,price,title,description,stock,cancle_price
        });
    }
    return response.status(200).json({message : ' painting Product Added...'});
} catch(err){
    console.log(err);
    return response.status(501).json({ error: "Internal server error" });
}
}

export const addProductImgExcel = async (request,response,next)=>{
    // const workbook = xlsx.readFile('Products entry.xlsx');// chair entry 162
    // const workbook = xlsx.readFile('productImage162.xlsx'); // chair images 162
    const workbook = xlsx.readFile('paintingImages163.xlsx');


    const sheet_name = workbook.SheetNames[0];
    const  sheet = workbook.Sheets[sheet_name];
    console.log(request.body);

    // convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);

    try{
        for (let item of data) {
        let product_id = item.product_id;
        let imageURL = item.imageURL;
        console.log(product_id + " " + imageURL);
        await ProductImage.create({
            product_id,imageURL
        });
    }
    return response.status(200).json({message : ' painting image  Added...'});
} catch(err){
    console.log(err);
    return response.status(501).json({ error: "Internal server error" });
}
}


export const addProduct = async (request, response, next) => {

    try {
        // let category_name = request.body.category_name;
        let result = await Category.findOne({ where: { category_name: request.body.category_name }, raw: true });

        if (result) {
            await Product.create({
                professional_id: request.body.professional_id,
                category_id: request.body.category_id,
                price: request.body.price,
                title: request.body.title,
                description: request.body.description,
                status: request.body.status,
                stock: request.body.stock,
                cancle_price : request.body.cancle_price 
            })
            .then(result =>{
        return response.status(200).json({message :"Product added successfully", data : result.dataValues} )
    })
        } else {
            //Category me  category_image add krna hai 
            const { filename } = request.file;

            let createCategory = await Category.create({
                category_name: request.body.category_name,
                category_image :"images/"+ filename,
            })
            if (createCategory) {
                await Product.create({
                    professional_id: request.body.professional_id,
                    category_id: request.body.category_id,
                    price: request.body.price,
                    title: request.body.title,
                    description: request.body.description,
                    status: request.body.status,
                    stock: request.body.stock,
                    cancle_price : request.body.cancle_price
                })
                return response.status(200).json({ message: 'Product added successfully in category...'  })
            }
            return response. status(500).json({ error: 'Internal server Problem...' });
        }
    } catch (err) {
        console.log("Error in categorycontroller.model ", err);
        return response.status(500).json({ error: 'Internal server Problem...' })
    }
}
export  const getProduct = (request,response,next)=>{
    Product.findAll({

    }).then(result =>{
        return response.status(200).json({products : result})
    }).catch(err=>{
        console.log(err);
        return response.status (500).json({error : 'Internal server Problem'});
    })
};
export const addcategory = (request,response,next)=>{
    const {filename} = request.file
    Category.create("category",{
        category_name : request.body.categoryName,
        category_image : "images/" + filename,
    }).then(result =>{
        return response.status(200).json({message : 'Category  added successfully...',data: result.dataValues});
    }).catch(err =>{
        console.log(err);
        return response.status(500).json({error :'Internal server Problem...'})
    })
    }
    export const productImage = (request,response,next)=>{
        const filename =  request.file.filename;
        ProductImage.create({
             product_id : request.body.product_id,
             imageURL : "images/" + filename
        }).then(result =>{
            return response.status(200).json({message : 'Product Image upload successfully',data : result.dataValues});
         }).catch(err =>{
            console.log(err);
            return response.status(500).json({error : 'Internal server Problem...'})
         })
    }
    export const productFeedback = (request,response,next)=>{
        ProductFeedback.create ({
            product_id : request.body.product_id,
            user_id : request.body.user_id,
            feedback : request.body.feedback}) 
              .then(result=>{
            return response.status(200).json({message: 'Product Feedback added successfully'});
         }).catch(err=>{
            console.log(err)
            return response.status(500).json({error : 'Internal server Problem...'});
         })
    }
    export const favourite_product = (request,response,next)=>{
        Favourite_product.create({
            user_id : request.body.user_id,
            product_id : request.body.product_id
        })
        .then(result=>{
            return response.status(200).json({message: ' Favourite Product  added successfully'});
         }).catch(err=>{
            console.log(err)
            return response.status(500).json({error : 'Internal server Problem...'});
         })

    }
    export const CategoryList = (request,response,next)=>{
        Category.findAll({})
        .then(result => {
            if (result.length !== 0) {
                return response.status(200).json({ data: result });
            }
            return response.status(404).json("Sorry, we couldn't find the information");
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server Problem..." });
        });
    }
    export  const getCategory = (request,response,next)=>{
        Category.findAll({
    
        }).then(result =>{
            return response.status(200).json({products : result})
        }).catch(err=>{
            console.log(err);
            return response.status (500).json({error : 'Internal server Problem'});
        })
    };    
