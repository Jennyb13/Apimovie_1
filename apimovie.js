

// MANEJO DINAMICO DE LA API
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click',() => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click',() => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

/*PANTALLA DE MUESTRA*/

 const cargarPeliculas = async() => {
    
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=32c63ed5142a6572d1bdcaaecb61d6c1&language=es-ES&page=${pagina}`);
        //console.log(respuesta);
        //verificacion de tipo de respuesta
        if(respuesta.status ===200){
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;

            });

            document.getElementById('contenedor').innerHTML = peliculas;
            
        } else if(respuesta.status ===401){
            console.log('error de clave');
        } else if(respuesta.status ===404){
            console.log('La pelicula no existe')
        } else{
            console.log('error no definido')
        }

    } catch(error){    
        console.log(error)
    }   

}
cargarPeliculas();





/*CONSULTAR DATOS API PARA AGREGAR
const cargarPeliculas = async() => {
    
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=32c63ed5142a6572d1bdcaaecb61d6c1&language=es-ES`);
        console.log(respuesta);
        //verificacion de tipo de respuesta

            const datos = await respuesta.json();
            console.log(datos);

    } catch(error){    
        console.log(error)
    }   
}

cargarPeliculas();*/

