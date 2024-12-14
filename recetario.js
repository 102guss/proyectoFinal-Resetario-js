// Arreglo para almacenar las recetas
let recipiente = [];

// Función para agregar una receta
function addRecipe(name, ingredients, steps, category, imageURL) {
    const recipe = {
        id: Date.now(), // ID único basado en la fecha actual
        name,
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        steps: steps.split(',').map(step => step.trim()),
        category,
        imageURL
    };

    recipiente.push(recipe);
    renderrecipiente(); // Volver a renderizar las recetas después de agregar una
}

// Función para renderizar todas las recetas
function renderrecipiente() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = ''; // Limpiar lista de recetas

    recipiente.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'col-md-12 mb-3';

        recipeElement.innerHTML = `
            <div class="card">
                <div class="card-header bg-secondary text-white">
                    <h5 class="card-title">${recipe.name}</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${recipe.imageURL}" class="img-fluid" alt="${recipe.name}">
                        </div>
                        <div class="col-md-8">
                            <p><strong>Ingredientes:</strong> ${recipe.ingredients.join(', ')}</p>
                            <p><strong>Pasos:</strong> ${recipe.steps.join(', ')}</p>
                            <p><strong>Categoría:</strong> ${recipe.category}</p>
                            <button class="btn btn-danger" onclick="deleteRecipe(${recipe.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        recipeList.appendChild(recipeElement);
    });
}

// Función para eliminar una receta
function deleteRecipe(id) {
    recipiente = recipiente.filter(recipe => recipe.id !== id); // Eliminar receta por ID
    renderrecipiente(); // Volver a renderizar la lista sin la receta eliminada
}

// Manejar el formulario de agregar receta
document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const category = document.getElementById('category').value;
    const imageURL = document.getElementById('imageURL').value;

    // Validar que los campos no estén vacíos
    if (name && ingredients && steps && category && imageURL) {
        addRecipe(name, ingredients, steps, category, imageURL); // Agregar la receta
    } else {
        alert('Por favor, completa todos los campos.');
    }

    event.target.reset(); // Limpiar el formulario después de enviar
});
