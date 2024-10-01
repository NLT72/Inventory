import Usermodel from "../models/Usermodel.js";
import ProductModel from "../models/product.model.js";

export default class UserController{
    getregister(req, res){
        res.render('register');
    }
    getlogin(req, res){
        res.render('login',{errorMessage:null});
    }
    postadduser(req, res){
        const {name , email, password}=req.body;
        Usermodel.add(name, email, password);
        res.render('login',{errorMessage:null});
    }
    postlogin(req, res){
        const {email, password}=req.body;
        const user=Usermodel.Validateuser(email, password);
        if(!user){
            return res.render('login',{errorMessage:'Invalid credentials'});
        }
        req.session.useremail=email;
        var products = ProductModel.getAll();
        res.render('index', { products });
    }
}