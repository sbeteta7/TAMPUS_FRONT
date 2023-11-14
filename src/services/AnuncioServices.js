import axios from "axios";
const ANUNCIO_REGISTER_REST_API_URL ="http://localhost:8080/api_tampu/anuncios/store";
const ETIQUETA_ANUNCIO_ADD_REST_API_URL="http://localhost:8080/api_tampu/anuncioEtiquetas/store"
const IMAGEN_REGISTER_REST_API_URL="http://localhost:8080/api_tampu/imagenes/upload"


class AnuncioServices{
    createAnuncio(anuncio){
        return axios.post(ANUNCIO_REGISTER_REST_API_URL,anuncio)
    }

    associateEtiquetas(etiquetas){
        return axios.post(ETIQUETA_ANUNCIO_ADD_REST_API_URL,etiquetas)
    }

    associateImagenes(){
        return axios.post(IMAGEN_REGISTER_REST_API_URL)
    }
}

export default new AnuncioServices();

