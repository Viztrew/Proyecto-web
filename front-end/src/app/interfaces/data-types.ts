export interface Pasos{
	id_paso:number;
	id_receta:number;
	paso:string;
	imagen:string;
}

export interface Recetas{
    id_receta:number;
	nombre:string;
	imagen:string;
	valoracion:number;
	porcion:string;
	valor:number;
	tiempo:number;
	dificultad:string;
	tipo_receta:string;
	calorias:number;
	descripcion:string;
	url:string;
}

export interface Tipos{
	id_tipo_receta:number;
	tipo_receta:string;
}
export interface Dificultades{
    id_dificultad:number;
    dificultad:string;
}

export interface Porciones{
	id_porcion:number;
	porcion:string;
}