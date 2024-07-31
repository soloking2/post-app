export interface IPost {
    body: string;
    id: number;
    title: string;
    userId: number;
}
export interface IPostTable {
    title: string;
    body: string;
    action: IPost;
}

export interface IPostPayload {
    body: string;
    title: string;
    userId: number
    id?: number;
}