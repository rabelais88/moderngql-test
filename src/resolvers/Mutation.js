export default {
  async createUser(root, args, { User }, info) {
    console.log(args.input);
    const { name, age, email } = args.input;
    await User.create({ name, age, email });
    return await User.findOne({ email });
  },
  async deleteUser(root, args, { User }, info) {
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
  }
}