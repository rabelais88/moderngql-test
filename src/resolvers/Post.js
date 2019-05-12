export default { // nested/relational data
  author(parent, args, ctx, info) {
    const authors = [
      {
        id: "1a",
        name: "johnson"
      }
    ];
    return authors.find(author => author.id === parent.author);
  }
}