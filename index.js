import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';

const app = express();
const productsController =
  new ProductsController();
app.use(express.static('Public'));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/', productsController.getProducts);
app.get(
  '/add-product',
  productsController.getAddProduct
);
app.get(
  '/update-product/:id',
  productsController.getUpdateProductView
);
app.post(
  '/delete-product/:id',
   productsController.getdeleteproduct
  );
app.post(
  '/',
  validationMiddleware,
  productsController.postAddProduct
);
app.post(
  '/update-product',
  productsController.getPostUpdate
);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
