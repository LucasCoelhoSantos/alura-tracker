import http from "@/http";
import ITask from "@/interface/ITask";
import { Module } from "vuex";
import { State } from "@/store";
import { A_GET_TASKS, A_ADD_TASK, A_EDIT_TASK, A_DELETE_TASK } from "@/store/actions-type";
import { M_ADD_TASK, M_EDIT_TASK, M_DELETE_TASK, M_DEFINE_TASKS, NOTIFY } from "@/store/mutations-type";

export interface TaskState {
  tasks: ITask[]
}

export const task: Module<TaskState, State> = {
    state: {
      tasks: [],
    },
    mutations: {
        // TASK MUTATIONS
        [M_ADD_TASK](state, task: ITask) {
            state.tasks.push(task)
        },
		[M_EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[index] = task
        },
		[M_DELETE_TASK] (state, id: number) {
            state.tasks = state.tasks.filter(t => t.id != id)
        },
        [M_DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks
          },
    },
    actions: {
        // TASK ACTIONS
        [A_GET_TASKS] ({ commit }, filter: string) {
            let url = "tasks"

            if (filter) {
                url += "?description=" + filter
            }
            
            http.get(url)
                .then(response => commit(M_DEFINE_TASKS, response.data))
        },
        [A_ADD_TASK] ({ commit }, task: ITask) {
            return http.post("/tasks", task)
                .then(response => commit(M_ADD_TASK, response.data))
        },
        [A_EDIT_TASK] ({ commit }, task: ITask) {
            return http.put(`/tasks/${task.id}`, task)
                .then(() => commit(M_EDIT_TASK, task))
        },
        [A_DELETE_TASK] ({ commit }, id: number) {
            return http.delete(`/tasks/${id}`)
                .then(() => commit(M_DELETE_TASK, id))
        },
    },
}