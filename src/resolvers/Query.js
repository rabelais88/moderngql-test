export default {
  hello() {
    return "This is my first query!";
  },
  name() {
    return "Andrew Mead";
  },
  location() {
    return "Philadelphia";
  },
  bio() {
    return "I live in Philly and teach on Udemy!";
  },
  me() {
    return {
      id: "12345",
      name: "max",
      email: "abc@def.com",
      age: 32
    };
  },
  greeting(parent, args, ctx, info) {
    const { name } = args;
    return `hello ${name}`;
  },
  grades() {
    return new Array(10).fill(0).map(e => Math.round(Math.random() * 100));
  },
  add(parent, args, ctx, info) {
    const { numbers } = args;
    return numbers.reduce((ac, cv) => ac + cv, 0);
  },
  posts(parent, args, ctx, info) {
    return [
      {
        id: "abcee",
        title: "great book",
        author: "1a"
      }
    ];
  },
  users(parent, args, ctx, info) {
    return ctx.User.find();
  }
}