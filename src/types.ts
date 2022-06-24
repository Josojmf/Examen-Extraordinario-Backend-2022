
export type Editorial = {
    nombre:string
    web: string,
    pais:string
}

export type Autor = {
    nombre_apellido: string,
    lengua:string
}

export type Libro = {
    titulo:string,
    autor:Autor,
    editorial:Editorial,
    anio:number
}

