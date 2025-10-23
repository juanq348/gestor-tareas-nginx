import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/tareas.service.js';
import { validationResult } from 'express-validator';

export const create = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
        const tarea = await service.createTarea(req.body);
        res.status(201).json(tarea);
    } catch (error) {
        console.error('Error al crear tarea:', error)
        next(error);
    }
}

export const list = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const filter : any = {};
        const list = await service.listTareas(filter);
        res.json(list);
    } catch (error) {
        console.error('Error al listar tareas:', error);
        next(error);
    }
}

export const update = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const tareas = await service.updateTarea(Number(req.params.id), req.body);
        res.json(tareas);
    } catch (error) {
        console.error('Error al actualizar tareas', error);
        next(error);
    }
}

export const remove = async(req:Request, res:Response, next:NextFunction) => {
    try {
        await service.deleteTareaById(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        next(error);
    }
}