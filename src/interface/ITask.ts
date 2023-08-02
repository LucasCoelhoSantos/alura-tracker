import IProject from "./IProject";

export default interface ITask {
    id: number,
    duration: number,
    description: string,
    project: IProject,
}