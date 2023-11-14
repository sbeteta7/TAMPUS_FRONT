import React, { useEffect, useState } from 'react';
import AnuncioServices from '../services/AnuncioServices';
import EtiquetaServices from '../services/EtiquetaService';
import { RadioGroup,Box, FormControl,FormControlLabel,FormGroup,Checkbox,Card
,CardContent,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MinimumNumberInput from './atoms/MinimumNumberInput';
import NumberInputBasic from './atoms/NumberInputBasic';
import RangePublishForm from './molecules/RangePublishForm';
import FormImg from './molecules/FormImg';


function PublishForm() {

  const [id_anuncio,setId_anuncio] = useState()
  const [titulo, setTitulo] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [precio_min, setPrecioMin] = useState();
  const [precio_max, setPrecioMax] = useState();

  const [tipo_espacio, setTipoEspacio] = useState('');
  const [num_hab, setNumHabitaciones] = useState();
  const [num_cama, setNumCamas] = useState();
  const [dimensiones, setDimensiones] = useState();
  const [etiquetas, setEtiquetas] = useState([]);
  const [postEtiquetas,setPostEtiquetas]=useState([])
  
useEffect(()=>{
  EtiquetaServices.getAllEtiquetas().then(response =>{
    setEtiquetas(response.data);
    
  }).catch(error=>{
    console.log(error);
  })
})
  const saveAnuncio = (e) => {
    e.preventDefault();

    const anuncio = {titulo,descripcion,ubicacion,precio_min,precio_max,tipo_espacio,num_hab,num_cama,dimensiones};
  AnuncioServices.createAnuncio(anuncio)
  .then(response=>{
    const id=response.data.id_anuncio
    setId_anuncio(id)
    console.log("ID de anuncio = " + id + " TIPO DE DATO = " + typeof(response.data.id_anuncio))
    
    const selectedEtiquetas = etiquetas.filter((etiqueta) => postEtiquetas.includes(etiqueta.id_etiqueta));
    console.log("Selected Etiquetas es: " + selectedEtiquetas)
    setPostEtiquetas(selectedEtiquetas);
    associateEtiquetasWithAnuncio(id);
    console.log(id)
  }).catch(error=>{
    console.log(error)
  })


}
const associateEtiquetasWithAnuncio = (id_anuncio) => {
  const id_etiquetas = postEtiquetas.map(etiqueta => etiqueta.id_etiqueta);
  
  const requestBody = {
    id_anuncio: id_anuncio,
    id_etiquetas: id_etiquetas,
  };

  console.log(requestBody)
  AnuncioServices.associateEtiquetas(requestBody)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

/* function addImage() {
const imagen = {id_anuncio,imagen};
AnuncioServices.associateImagenes(imagen)
} */
/*
const addImage = (e) => {
e.preventDefault();
const imagen = {id_anuncio,imagen};
AnuncioServices.associateImagenes(imagen).then((response)=>{
  console.log(response.data)  
}).catch(error=>{
  console.log()
})
}
*/

/*
  .then(()=>{
    for (const image of imagenes) {
      const newImagen = { imagen: image, id_anuncio: id_anuncio };
      AnuncioServices.associateImagenes(newImagen)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
*/

const handleFileUpload = (e) => {
const files = e.target.files; // Obtiene la lista de archivos seleccionados
if (files && files.length > 0) {
  const selectedImages = Array.from(files); // Convierte la lista de archivos en un array
  setImagenes(selectedImages); // Almacena los archivos en el estado "imagenes"
}
};

const handleEtiquetaChange = (etiquetaId, isChecked) => {
  // Copia el estado actual de postEtiquetas en una nueva variable
  const updatedPostEtiquetas = [...postEtiquetas];
  
  if (isChecked) {
    // Si el checkbox se marca, agrega la etiqueta completa al array
    const etiqueta = etiquetas.find(etiqueta => etiqueta.id_etiqueta === etiquetaId);
    if (etiqueta) {
      updatedPostEtiquetas.push(etiqueta);
    }
  } else {
    // Si el checkbox se desmarca, elimina la etiqueta del array
    const index = updatedPostEtiquetas.findIndex(etiqueta => etiqueta.id_etiqueta === etiquetaId);
    if (index !== -1) {
      updatedPostEtiquetas.splice(index, 1);
    }
  }

  // Actualiza el estado postEtiquetas con la nueva variable
  setPostEtiquetas(updatedPostEtiquetas);
};

    return(
        <>
          <FormControl>
            <Box>
              

            <Card variant="outlined">
              <CardContent>
                {/* <Typography variant="body2" color="text.secondary"> */}
                  <Box my={2}>
                    <TextField 
                      id="standard-basic"
                      label="Titulo"
                      variant="standard"
                      type="text"
                      name="titulo"
                      value={titulo}
                      fullWidth
                      onChange={(e)=>setTitulo(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormImg />
                  </Box>
                  <TextField
                    id="outlined-basic"
                    label="Descripcion"
                    variant="outlined"
                    name="descripcion"
                    value={descripcion}
                    fullWidth
                    onChange={(e)=>setDescripcion(e.target.value)}
                  />
             {/*    </Typography> */}
              </CardContent>
            </Card>


            </Box>
            <Box>
              <p>Tipo de espacio</p>       
                       
       
              <RadioGroup
                  aria-label="custom-radio-group"
                  name="TipoEspacio"    
                >
                <div>
                  <input type="radio" id="habitacion" name="TipoEspacio" value="Habitación"
                    onChange={(e)=> setTipoEspacio(e.target.value)}  />
                  <label htmlFor="habitacion">Habitación</label>
                </div>

                <div>
                  <input type="radio" id="departamento" name="TipoEspacio" value="Departamento" 
                    onChange={(e)=> setTipoEspacio(e.target.value)}/>
                  <label htmlFor="departamento">Departamento</label>
                </div>

                <div>
                  <input type="radio" id="casa" name="TipoEspacio" value="Casa" 
                    onChange={(e)=> setTipoEspacio(e.target.value)}/>
                  <label htmlFor="casa">Casa</label>
                </div>
              </RadioGroup>
            </Box>
            <Box>
              <RangePublishForm/>
            </Box>
            <Box>
              <p>Precio Min</p>
              <NumberInputBasic name="PrecioMin"
               onChange={(e)=> setPrecioMin(e.target.value)}/>
              <p>Precio Max</p>
              <NumberInputBasic name="PrecioMax" onChange={(e)=> setPrecioMax(e.target.value)}/>
            </Box>
            <Box>
              <p>Dimensiones en m2</p>
              <NumberInputBasic name="Dimension" onChange={(e)=> setDimensiones(e.target.value)}/>
            </Box>
            <Box>
              <p>Numero de habitaciones</p>
              <MinimumNumberInput name="NumHabitacion" onChange={(e)=> setNumHabitaciones(e.target.value)}/>
            </Box>
            <Box>
              <p>Numero de camas</p>
              <MinimumNumberInput name="NumCamas" onChange={(e)=> setNumCamas(e.target.value)} />
            </Box>

            <Box>
          {etiquetas.map((etiqueta) => (
            
            
              <div key={etiqueta.id_etiqueta}>
                <FormGroup>
                <FormControlLabel control={<Checkbox
                value={etiqueta.id_etiqueta}
                onChange={(e) =>
                  handleEtiquetaChange(
                    etiqueta.id_etiqueta,
                    e.target.checked // Verifica si el checkbox se marca o desmarca
                  )
                }
                />} label={etiqueta.nombre} />
              </FormGroup>
                
                <br />
              </div>
            ))}  
            </Box>          
            <Box>
            
               <LoadingButton 
                onClick={(e) => saveAnuncio(e)}
                size='small'
                variant='outlined'>
                Publicar anuncio
              </LoadingButton>
              </Box>
        
          </FormControl>
        </>
    )
}

export default PublishForm