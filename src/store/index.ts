import IProject from "@/interface/IProject";
import ITask from "@/interface/ITask";
import { INotification } from "@/interface/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, EDIT_PROJECT, DESTROY_PROJECT, ADD_TASK, EDIT_TASK, DESTROY_TASK, NOTIFY } from "./mutations-type";

interface State {
    projects: IProject[],
    tasks: ITask[],
    notifications: INotification[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        tasks: [],
        notifications: [],
    },
    mutations: {
        // PROJECT MUTATIONS
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        },
        [EDIT_PROJECT](state, project:IProject) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [DESTROY_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        // TASK MUTATIONS
        [ADD_TASK](state, task: ITask) {
            task.id = new Date().toISOString()
            state.tasks.push(task)
        },
		[EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[index] = task
        },
		[DESTROY_TASK] (state, id: string) {
            state.tasks = state.tasks.filter(t => t.id != id)
        },
        // NOTIFICATION MUTATIONS
        [NOTIFY] (state, newNotification: INotification) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)
            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        },
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}