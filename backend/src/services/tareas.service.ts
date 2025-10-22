import Tareas from "../models/Tareas"
import { ApiError } from "../utils/ApiError"

export const createTarea = async (data : any) => {
    const exists = await Tareas.findOne({where:{titulo: data.titulo}});
    if(exists) throw new ApiError(400, 'Tarea ya creada');
    const tarea = await Tareas.create(data);
    return tarea;
}

export const listTareas = async (filter: any = {}) => {
    return Tareas.findAll({where:filter, order:[['id', 'ASC']]});
}

export const updateTarea = async (id : number, data:any) => {
    const tarea = await Tareas.findByPk(id);
    if(!tarea) throw new ApiError(404, 'Tarea no encontrada');
    if(data.titulo && data.titulo !== tarea.titulo){
        const exists = await Tareas.findOne({where:{titulo: data.titulo}});
        if(exists) throw new ApiError(400, 'Tarea ya creada')
    }
    await tarea.update(data);
    return tarea;
}

export const deleteTareaById = async(id:number) => {
    const tarea = await Tareas.findByPk(id);
    if(!tarea) throw new ApiError(404, 'Tarea no encontrada') ;
    await tarea?.destroy();
    return;
}