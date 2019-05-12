const Post = {
  async comments({ id }, args, { Comment }, info) {
    const comments = await Comment.find({ post: id });
    return comments;
  },
  async author({ author }, args, { User }, info) {
    const user = await User.findOne({ _id: author });
    return user;
  }
};

export default Post;