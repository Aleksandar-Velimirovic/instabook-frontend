import { HttpService } from './HttpService'

class CommentService extends HttpService {
  addComment(comment) {
    return this.axios.post('comment', comment)
  }
}

export const commentService = new CommentService()