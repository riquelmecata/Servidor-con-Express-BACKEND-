import {promises as fs} from "fs"

export default class ProductManager {
    constructor() {
        this.patch = "./products.txt"
        this.products = []
    }

    static id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title, description, price, thumbnail, code, stock, id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let showProducts = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(showProducts)
    }

    getProducts = async () => {
        let showProducts2 = await this.readProducts()
       return console.log(showProducts2)
    }

    getProductsById = async (id) => {
        let findId = await this.readProducts()
        if(!findId.find(product => product.id === id)) {
            console.log("Producto no encontrado")
        } else {
            console.log(findId.find(product => product.id === id))
 
        }

    }

    deleteProductsById = async (id) => {
        let findId = await this.readProducts();
        let filter = findId.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(filter));
        console.log("Producto eliminado")
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let oldProd = await this.readProducts()
        let newProd = [{...producto,  id},...oldProd];
        await fs.writeFile(this.patch, JSON.stringify(newProd));

    }
}



// Agregar productos
/* productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productos.addProduct("producto prueba2", "Este es un producto prueba2", 300, "Sin imagen2", "abc1234", 30)
productos.addProduct("producto prueba3", "Este es un producto prueba3", 350, "Sin imagen3", "abc12345", 50)
productos.addProduct("producto prueba4", "Este es un producto prueba4", 400, "Sin imagen4", "abc123456", 20)
productos.addProduct("producto prueba5", "Este es un producto prueba5", 500, "Sin imagen5", "abc1234567", 10)
productos.addProduct("producto prueba6", "Este es un producto prueba6", 300, "Sin imagen6", "abc30", 50)
productos.addProduct("producto prueba7", "Este es un producto prueba7", 200, "Sin imagen7", "abc31", 20)
productos.addProduct("producto prueba8", "Este es un producto prueba8", 100, "Sin imagen8", "abc4", 30)
productos.addProduct("producto prueba9", "Este es un producto prueba9", 150, "Sin imagen9", "abc41", 70)
productos.addProduct("producto prueba10", "Este es un producto prueba10", 30, "Sin imagen10", "abc34", 5) */

// productos.getProducts()

//Obtener producto por Id
// productos.getProductsById(1)

//Elimnar producto por Id
// productos.deleteProductsById(2)

//Sustituir producto con un mismo Id
/* productos.updateProducts({
    title: 'producto prueba nuevo',
    description: 'Este es un producto prueba nuevo',
    price: 2000,
    thumbnail: 'Sin imagen nuevo',
    code: 'abc123',
    stock: 30,
    id: 2
}) */