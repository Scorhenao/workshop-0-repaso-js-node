const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

class GestorProducts {
    constructor() {
        this.products = products;
    }

    renderProducts() {
        const productsContainer = document.getElementById('products-container');
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add("col", "w-50", "bg-gradient", "m-5", "p-2", "rounded", "shadow-lg");
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <button class="btn btn-primary">Comprar</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    totalPriceProducts() {
        const containerTotal = document.getElementById("total-price-products");
        const sumProducts = this.products.reduce((acc, product) => acc + product.price, 0);
        containerTotal.innerHTML = `
            <button class="btn btn-success no-pointer w-25 text-center">Total: $${sumProducts}</button>
        `;
    }

    filterByCategory() {
        const form = document.getElementById("filter-form");
        const containerProducts = document.getElementById("products-container");
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let category = document.getElementById("category-filter").value;
            containerProducts.innerHTML = ""; // Limpiar productos existentes
    
            if (category === "Todos") {
                // Mostrar todos los productos
                this.renderProducts();
            } else {
                // Filtrar productos por categoría
                const filteredProducts = this.products.filter(product => product.category === category);
    
                if (filteredProducts.length > 0) {
                    // Mostrar productos filtrados
                    filteredProducts.forEach(product => {
                        const productElement = document.createElement('div');
                        productElement.classList.add("col", "w-50", "bg-gradient", "m-5", "p-2", "rounded", "shadow-lg");
                        productElement.innerHTML = `
                            <h3>${product.name}</h3>
                            <p>Category: ${product.category}</p>
                            <p>Price: ${product.price}</p>
                            <p>Stock: ${product.stock}</p>
                            <button class="btn btn-primary">Comprar</button>
                        `;
                        containerProducts.appendChild(productElement);
                    });
                } else {
                    // Mostrar mensaje de error si no hay productos en la categoría
                    containerProducts.innerHTML = "No hay productos en esta categoría";
                }
            }
        });
    }

    loadProducts() {
        try {
            this.renderProducts();
            this.totalPriceProducts();
            this.filterByCategory();
        } catch (error) {
            console.warn(error);
        }
    }
}

const gestorProducts = new GestorProducts();
gestorProducts.loadProducts();
