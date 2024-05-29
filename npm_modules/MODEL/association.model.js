import User from './user.model.js'
import Cart from './cart.model.js';
import CartItem from './CartItem.model.js';
import {Product,ProductImage,ProductFeedback,Favourite_product} from './product.model.js';
import { RoomType, Design, Design_image } from './design.model.js'
import Professional from './professional.model.js';
import Orders from './orders.model.js';
import OrderItems from './ordersItems.model.js';
import Category from './category.model.js'
import Subscription from './subscription.model.js';
import { DesignFeedback ,DesignFav} from './design.model.js';
import { PaymentData } from './payment.model.js';
// import { PaymentData } from './payment.model.js';

// import ProductImage from './product.model.js';

console.log("Association Executed....................................................................................................................................................................................");


User.hasOne(Cart, { foreignKey: 'user_id' ,allowNull: false});
Cart.belongsTo(User, { foreignKey: 'user_id' ,allowNull: false, unique: true });

Professional.hasMany(Subscription, { foreignKey: 'professional_id' ,allowNull: false});
Subscription.belongsTo(Professional, { foreignKey: 'professional_id',allowNull: false });

// professional can have many subscriptions, and each subscription has one payment,

Subscription.hasOne(PaymentData, { foreignKey: 'sub_id',allowNull: false });
PaymentData.belongsTo(Subscription, { foreignKey: 'sub_id',allowNull: false });



Design.hasMany(Design_image, { foreignKey: 'design_id',allowNull: false });
Design_image.belongsTo(Design, { foreignKey: 'design_id',allowNull: false });

Professional.hasMany(Design, { foreignKey: 'professional_id' ,allowNull: false});
Design.belongsTo(Professional, { foreignKey: 'professional_id' ,allowNull: false});

RoomType.hasMany(Design, { foreignKey: 'roomType_id',allowNull: false });
Design.belongsTo(RoomType, { foreignKey: 'roomType_id',allowNull: false });

Design.hasMany(DesignFeedback, { foreignKey: 'design_id' ,allowNull: false});
DesignFeedback.belongsTo(Design, { foreignKey: 'design_id' ,allowNull: false});

User.hasMany(DesignFeedback, { foreignKey: 'user_id',allowNull: false});
DesignFeedback.belongsTo(User, { foreignKey: 'user_id' ,allowNull: false});

User.hasMany(DesignFav, { foreignKey: 'user_id' });
DesignFav.belongsTo(User, { foreignKey: 'user_id' });

// Design.hasMany(DesignFav, { foreignKey: 'design_id' });
// DesignFav.belongsTo(Design, { foreignKey: 'design_id' });
Design_image.hasMany(DesignFav, { foreignKey: 'designImg_id' });
DesignFav.belongsTo(Design_image, { foreignKey: 'designImg_id' });


Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });


Cart.hasMany(CartItem, { foreignKey: 'cart_id' ,allowNull: false});
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' ,allowNull: false});

Product.hasMany(CartItem, { foreignKey: 'product_id',allowNull: false });
CartItem.belongsTo(Product, { foreignKey: 'product_id' ,allowNull: false});

Cart.hasOne(CartItem, { foreignKey: 'cart_id',allowNull: false });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' ,allowNull: false});

User.hasMany(Orders, { foreignKey: 'user_id',allowNull: false });
Orders.belongsTo(User, { foreignKey: 'user_id' ,allowNull: false});

Orders.hasMany(OrderItems, { foreignKey: 'order_id',allowNull: false });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id',allowNull: false });

Category.hasMany(Product, { foreignKey: 'category_id',allowNull: false });
Product.belongsTo(Category, { foreignKey: 'category_id',allowNull: false });

Professional.hasMany(Product, { foreignKey: 'professional_id',allowNull: false });
Product.belongsTo(Professional, { foreignKey: 'professional_id',allowNull: false });


Product.hasMany(OrderItems, { foreignKey: 'product_id' ,allowNull: false});
OrderItems.belongsTo(Product, { foreignKey: 'product_id' ,allowNull: false});

User.hasMany(ProductFeedback, { foreignKey: 'user_id' });
ProductFeedback.belongsTo(User, { foreignKey: 'user_id' });


Product.hasMany(ProductFeedback, { foreignKey: 'product_id' });
ProductFeedback.belongsTo(Product, { foreignKey: 'product_id' });

// User.belongsToMany(Product, { through: 'Favourite_product', foreignKey: 'user_id' });
// Product.belongsToMany(User, { through: 'Favourite_product', foreignKey: 'product_id' });

User.hasMany(Favourite_product, { foreignKey: 'user_id' });
Favourite_product.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Favourite_product, { foreignKey: 'product_id' });
Favourite_product.belongsTo(Product, { foreignKey: 'product_id' });



export {Cart,User,CartItem,Product,Design,Design_image,OrderItems,Orders,RoomType,Subscription,PaymentData,ProductFeedback,DesignFav,Favourite_product}