console.log("Inicio");

// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

async function fetchOrderDetails() {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user.id);
    // Obtener comentarios de todos los posts del usuario
    const commentsPromises = posts.map(post => getComments(post.id));
    const commentsArray = await Promise.all(commentsPromises);

    // Unir todos los comentarios en un solo array
    const allComments = commentsArray.flat();

    
    // Filter es para filtrar comentarios que contengan la palabra 'qui'
    const filteredComments = allComments.filter(comment => comment.body.includes('qui'));

    // Map para obtener solo los cuerpos de los comentarios
    const commentBodies = filteredComments.map(comment => comment.body);

    // Reducir los cuerpos de los comentarios a una sola cadena de texto
    const concatenatedComments = commentBodies.reduce((acc, body) => acc + ' ' + body, '');

    console.log("Comentarios concatenados:", concatenatedComments);
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log("Inicio");

fetchOrderDetails();



