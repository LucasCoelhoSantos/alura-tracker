import http from "@/http";
import IProject from "@/interface/IProject";
import { Module } from "vuex";
import { State } from "@/store";
import { A_GET_PROJECTS, A_ADD_PROJECT, A_EDIT_PROJECT, A_DELETE_PROJECT } from "@/store/actions-type";
import { M_ADD_PROJECT, M_EDIT_PROJECT, M_DELETE_PROJECT, M_DEFINE_PROJECTS } from "@/store/mutations-type";

export interface ProjectState {
    projects: IProject[]
}

export const project: Module<ProjectState, State> = {
    mutations: {
        // PROJECT MUTATIONS
        [M_ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        },
        [M_EDIT_PROJECT](state, project:IProject) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [M_DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [M_DEFINE_PROJECTS](state, projects: IProject[]) {
            state.projects = projects
        },
    },
    actions: {
        // PROJECT ACTIONS
        [A_GET_PROJECTS] ({ commit }) {
            http.get("projects")
                .then(response => commit(M_DEFINE_PROJECTS, response.data))
        },
        [A_ADD_PROJECT] (context, projectName: string ) {
            return http.post("/projects", {
                name: projectName,
            })
        },
        [A_EDIT_PROJECT] (context, project: IProject) {
            return http.put(`/projects/${project.id}`, project)
        },
        [A_DELETE_PROJECT] ({ commit }, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(M_DELETE_PROJECT, id))
        },
    },
}