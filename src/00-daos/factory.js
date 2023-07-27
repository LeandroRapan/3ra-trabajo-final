import ProductsDaoFs from "./filesystem/products.dao.js";
import CartDao from "./mongodb/Cart.dao.js";
import MsgManagerMongoDb from "./mongodb/messages.dao.js";
import UserDao from "./mongodb/user.dao.js";
import ProductsDaoMongoDB from "./mongodb/products.dao.js";

let userManager;
let cartManager;
let msgManager;
let productsManager;

let persistence = process.argv[2];

switch (persistence){
    case "file":
        productsManager = new ProductsDaoFs("./src/00-daos/filesystem/products.json")
        break;
    case "mongo":
        userManager = new UserDao();
        cartManager = new CartDao();
        msgManager = new MsgManagerMongoDb();
        productsManager = new ProductsDaoMongoDB();
        break;
    default:
        userManager = new UserDao();
        cartManager = new CartDao();
        msgManager = new MsgManagerMongoDb();
        productsManager = new ProductsDaoMongoDB();
        break
}
export default {userManager, productsManager, msgManager,cartManager}