document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar productos desde la API
    const fetchProducts = () => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(products => {
                // Llamar a displayProducts con los productos obtenidos
                displayProducts(products);
            })
            .catch(error => {
                // Capturar y mostrar el error en caso de fallo en la solicitud
                displayError(error);
            });
    };

    // Función para mostrar los productos en tarjetas
    const displayProducts = (products) => {
        const cardsContainer = document.getElementById("cards-container");
        // Verificar si cardsContainer existe antes de manipularlo
        if (!cardsContainer) {
            console.error('Element with ID "cards-container" not found.');
            return;
        }
        cardsContainer.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = "card";

            const img = document.createElement('img');
            img.src = product.category.image;
            img.className = "card-img-top";
            card.appendChild(img);

            const cardBody = document.createElement('div');
            cardBody.className = "card-body";

            const title = document.createElement('h5');
            title.className = "card-title";
            title.textContent = product.title;
            cardBody.appendChild(title);

            const description = document.createElement('p');
            description.className = "card-text";
            description.textContent = product.description;
            cardBody.appendChild(description);

            const price = document.createElement('a');
            price.classList.add("btn", "btn-primary"); // Utilizar add() para añadir múltiples clases
            price.textContent = `$${product.price}`;
            cardBody.appendChild(price);

            card.appendChild(cardBody);
            cardsContainer.appendChild(card);
        });
    };

    // Función para mostrar mensajes de error
    const displayError = (error) => {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = `Error: ${error.message}`;
        } else {
            console.error('Element with ID "error-message" not found.');
        }
    };

    // Llamar a fetchProducts para iniciar la carga de productos al cargar la página
    fetchProducts();
});
