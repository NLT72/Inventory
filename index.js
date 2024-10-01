import express from 'express';
import { auth } from './src/middlewares/auth.middleware.js';
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/User.controller.js';
import session from 'express-session';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadfile } from './src/middlewares/file-upload.middleware.js';

const app = express();
const productsController =
  new ProductsController();
const usercontroller= new UserController();
app.use(express.static('Public'));
app.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookies:{secure:false}
}))
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);
app.get('/register', usercontroller.getregister);
app.get('/login', usercontroller.getlogin);
app.post('/register',usercontroller.postadduser);
app.post('/login', usercontroller.postlogin);
app.get('/',auth, productsController.getProducts);
app.get(
  '/add-product',auth,
  productsController.getAddProduct
);
app.get(
  '/update-product/:id',auth,
  productsController.getUpdateProductView
);
app.post(
  '/delete-product/:id',auth,
   productsController.getdeleteproduct
  );
app.post(
  '/',auth,
  uploadfile.single('imageUrl'),
  validationMiddleware,
  productsController.postAddProduct
);
app.post(
  '/update-product',auth,
  productsController.getPostUpdate
);

app.listen(3011, () => {
  console.log('Server is running on port 3001');
});
