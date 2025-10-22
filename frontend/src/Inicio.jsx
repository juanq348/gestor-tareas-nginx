import { useEffect, useState } from "react"
import { tareasService } from "./services/api"

export default function Inicio() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [newTask, setNewTask] = useState({
  titulo: "",
  descripcion: "",
  estado: "pendiente",
});
const [editingId, setEditingId] = useState(null);
const [editData, setEditData] = useState({
  tutlo:"",
  descripcion: "",
  estado:"pendiente",
});

const fetchTasks = async() => {
  try {
    setLoading(true);
    const { data }= await tareasService.obtenerTareas();
    setTasks(data);
    setError("");
  } catch (error) {
    setError("No se pudieron cargar las tareas");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

const handleCreate = async (e) => {
  e.preventDefault();
  if(!newTask.titulo || !newTask.descripcion){
    return alert("Título y descripcio´n son obligatorios");
  }

  try {
    await tareasService.crearTarea(newTask);
    setNewTask({titulo: "", descripcion:"", estado:"pendiente"});
    fetchTasks();
  } catch (error) {
    alert("No se pudo crear la tarea");
  }
};

const startEdit = (t) => {
  setEditingId(t.id);
  setEditData({
      titlo: t.titulo,
      descripcion: t.descripcion,
      estado: t.estado,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({titulo:"", descripcion:"", estado:"pendiente"});
  }

  const handleUpdate = async (id) => {
    if(!editData.titulo || !editData.descripcion) {
      return alert("Título y descripcion son obligatorios");
    }
    try {
      await tareasService.updateTarea(id, editData);
      cancelEdit();
      fetchTasks();
    } catch (error) {
      alert("No se pudo actualizar la tarea");
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("¿Esta seguro que desea eliminar esta tarea?")) return;
    try {
      await tareasService.deleteTarea(id);
      fetchTasks();
    } catch (error) {
      alert("No se pudo eliminar la tarea");
    }
  }

  const handleCrearTarea = async() => {
    try {
      const { data } = await tareasService.crearTarea()
    } catch (error) {
      
    }
  }


    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl shadow-xl p-6">
            <h1 className="text-2xl font-bold mb-1">Gestor de Tareas</h1>
            {error && (
              <div className="mb-4 rounded-lg border border-red-700 bg-red-900/40 px-3 py-2 text-red-200">
                {error}
              </div>
            )}

          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mb-6"
          >
            <div>
              <label className="block text-sm mb-1">Título</label>
              <input
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Ej. Comprar insumos"
                value={newTask.titulo}
                onChange={(e) =>
                  setNewTask((s) => ({ ...s, titulo: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Descripción</label>
              <input
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Ej. Papel, marcadores"
                value={newTask.descripcion}
                onChange={(e) =>
                  setNewTask((s) => ({ ...s, descripcion: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Estado</label>
              <select
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                value={newTask.estado}
                onChange={(e) =>
                  setNewTask((s) => ({ ...s, estado: e.target.value }))
                }
              >
                <option value="pendiente">pendiente</option>
                <option value="completada">completada</option>
              </select>
            </div>
            <button
              type="submit"
              className="h-[42px] md:h-[38px] rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-500 px-4 font-medium cursor-pointer transition"
            >
              Crear
            </button>
          </form>

          {/* Tabla */}
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-slate-400">Cargando...</p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-400">No hay tareas aún.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="text-left p-3 border-b border-slate-700">ID</th>
                    <th className="text-left p-3 border-b border-slate-700">Título</th>
                    <th className="text-left p-3 border-b border-slate-700">Descripción</th>
                    <th className="text-left p-3 border-b border-slate-700">Estado</th>
                    <th className="text-right p-3 border-b border-slate-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3 border-b border-slate-800">{t.id}</td>
                      <td className="p-3 border-b border-slate-800">
                        {editingId === t.id ? (
                          <input
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                            value={editData.titulo}
                            onChange={(e) =>
                              setEditData((s) => ({ ...s, titulo: e.target.value }))
                            }
                          />
                        ) : (
                          t.titulo
                        )}
                      </td>
                      <td className="p-3 border-b border-slate-800">
                        {editingId === t.id ? (
                          <input
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                            value={editData.descripcion}
                            onChange={(e) =>
                              setEditData((s) => ({
                                ...s,
                                descripcion: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          t.descripcion
                        )}
                      </td>
                      <td className="p-3 border-b border-slate-800">
                        {editingId === t.id ? (
                          <select
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                            value={editData.estado}
                            onChange={(e) =>
                              setEditData((s) => ({ ...s, estado: e.target.value }))
                            }
                          >
                            <option value="pendiente">pendiente</option>
                            <option value="completada">completada</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              t.estado === "completada"
                                ? "bg-emerald-600/30 text-emerald-200 border border-emerald-700"
                                : "bg-amber-600/30 text-amber-200 border border-amber-700"
                            }`}
                          >
                            {t.estado}
                          </span>
                        )}
                      </td>
                      <td className="p-3 border-b border-slate-800">
                        <div className="flex gap-2 justify-end">
                          {editingId === t.id ? (
                            <>
                              <button
                                onClick={() => handleUpdate(t.id)}
                                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 border border-blue-500 cursor-pointer transition"
                              >
                                Guardar
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 cursor-pointer transition"
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(t)}
                                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 cursor-pointer transition"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(t.id)}
                                className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600 border border-rose-600 cursor-pointer transition"
                              >
                                Eliminar
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}