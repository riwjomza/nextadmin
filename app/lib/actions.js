"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Product,User } from "./models";
import { connectToDB } from "./utils";

export const addUser = async (formData) =>{
    const {username,email,password,phone,address,isAdmin,isActive} = Object.fromEntries(formData);
    try{
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            phone,
            address,
            isAdmin,
            isActive,
        });
        await newUser.save();
    }catch(err){
        console.log(err);
        // throw new Error("Fail to create user!")
    }

    //refresh page
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
    
};


export const updateUser = async (formData) =>{
    const {id,username,email,password,phone,address,isAdmin,isActive} = Object.fromEntries(formData);
    try{
        connectToDB();

        const updateFields = {
            username,email,password,phone,address,isAdmin,isActive
        }
//2:51:55
        Object.keys(updateFields)
    }catch(err){
        console.log(err);
        // throw new Error("Fail to create user!")
    }

    //refresh page
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
    
};


export const addProduct = async (formData) =>{
    const {title,desc,price,stock,color,size} = Object.fromEntries(formData);
    try{
        connectToDB();


        const newProduct= new Product({
            title,
            desc,
            price,
            stock,
            color,
            size,
        });
        await newProduct.save();
    }catch(err){
        console.log(err);
        // throw new Error("Fail to create product!")
    }

    //refresh page
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
    
};

export const deleteProduct = async (formData) =>{
    const {id} = Object.fromEntries(formData);
    try{
        connectToDB();

        await Product.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
        throw new Error("Fail to delete product!")
    }

    //refresh page
    revalidatePath("/dashboard/products")
    
};

export const deleteUser = async (formData) =>{
    const {id} = Object.fromEntries(formData);
    try{
        connectToDB();

        await User.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
        throw new Error("Fail to delete user!")
    }

    //refresh page
    revalidatePath("/dashboard/users")
    
};