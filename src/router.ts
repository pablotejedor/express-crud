import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/updates';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// Products

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

// Products

// Update

router.get('/update', getUpdates);

router.get('/update/:id', getOneUpdate);

router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  body('asset').optional(),
  handleInputErrors,
  updateUpdate
);

router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  body('version').optional().isString(),
  body('asset').optional().isString(),
  handleInputErrors,
  createUpdate
);

router.delete('/update/:id', deleteUpdate);

// Update

// Update points

router.get('/updatepoints', () => {});
router.get('/updatepoints/:id', () => {});
router.put(
  '/updatepoints/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputErrors,
  () => {}
);
router.post(
  '/updatepoints',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete('/updatepoints/:id', () => {});

// Update points

export default router;
