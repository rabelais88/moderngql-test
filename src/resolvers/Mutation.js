export default {
  async createUser(parent, args, { User }, info) {
    console.log(args.input);
    const { name, age, email } = args.input;
    await User.create({ name, age, email });
    return await User.findOne({ email });
  },
  async deleteUser(parent, args, { User }, info) {
    const { id } = args;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error('user not found');
      await user.remove();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async createPost(parent, { input: { authorId, title, content } }, { Post, User }, info) {
    const user = await User.findOne({ _id: authorId });
    if (!user) throw new Error('user not found');
    const post = await Post.create({ author: user, title, content });
    return post;
  },
  async createComment(parent, { input: { content, postId, authorId }}, { Post, User, Comment }, info) {
    const user = await User.findOne({ _id: authorId });
    if (!user) throw new Error('user not found');
    const post = await Post.findOne({ _id: postId });
    if (!post) throw new Error('post not found');
    const comment = await Comment.create({ content, post, author: user });
    return comment;
  }
}