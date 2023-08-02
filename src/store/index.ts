import { INotification } from "@/interface/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFY } from "./mutations-type";
import { ProjectState, project } from "./modules/projects";
import { TaskState, task } from "./modules/tasks";

export interface State {
    notifications: INotification[],
    project: ProjectState,
    task: TaskState,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        notifications: [],
        project: {
            projects: []
        },
        task: {
            tasks: []
        },
    },
    mutations: {
        // NOTIFICATION MUTATIONS
        [NOTIFY] (state, newNotification: INotification) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)
            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        },
    },
    modules: {
        project,
        task,
    },
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}