
const count = {
  subscribe(parent, args, { pubsub }, info) {
    let count = 0;

    setInterval(() => {
      count++;
      pubsub.publish('count', { count });
    }, 1000)
    return pubsub.asyncIterator('count');
  }
}

const comments = {
  async subscribe(parent, { postId }, { pubsub, Post }, info) {
    const post = await Post.findOne({ _id: postId });
    if (!post) throw new Error('post does not exist');
    return pubsub.asyncIterator(`comment ${postId}`);
  }
}

const Subscription = {
  count,
  comments
}

export { Subscription as default };