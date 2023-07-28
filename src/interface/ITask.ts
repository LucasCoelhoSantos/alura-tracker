import IProject from "./IProject";

export default interface ITask {
    id: string,
    duration: number,
    description: string,
    project?: IProject,
}