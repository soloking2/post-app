import { environment } from "../../environments/environment";

const baseUrl = environment.baseUrl;

export const ENDPOINT = {
    POSTS: {
        get_posts: `${baseUrl}/posts`,
        create_post: `${baseUrl}/posts`,
        edit_post: (postId: number) => `${baseUrl}/posts/${postId}`,
        delete_post: (postId: number) => `${baseUrl}/posts/${postId}`
    }
}