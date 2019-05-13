const Comment = {
  async post({ post }, arg, { Comment }, info) {
    const _post = await Comment.findOne({ _id: post }); // assumes parent data is already resolved
    return _post;
  },
  async author({ author }, arg, { User }, info) {
    const _author = await User.findOne({ _id: author }); // assumes parent data is already resolved
    return _author;
  }
}

export default Comment;