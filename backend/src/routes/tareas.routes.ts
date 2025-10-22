import { Router } from "express";
import { body, param } from "express-validator";
import * as controller from '../controllers/tareas.controller';

const router = Router();

router.get('/', controller.list);

router.post('/', [
                    body('titulo').notEmpty(),
                    body('descripcion').notEmpty(),
                    body('estado').optional().isIn(['pendiente', 'completada'])
                ]
                , controller.create
            );

router.put('/:id', [param('id').isInt()], controller.update);

router.delete('/:id', [param('id').isInt()], controller.remove);

export default router;