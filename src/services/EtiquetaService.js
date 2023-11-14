import axios from "axios";
const ETIQUETA_GET_REST_API_URL ="http://localhost:8080/api_tampu/etiquetas/getAll";

class EtiquetaServices{
    getAllEtiquetas(){
        return axios.get(ETIQUETA_GET_REST_API_URL)
    }
}
export default new EtiquetaServices();