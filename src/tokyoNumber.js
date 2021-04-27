// mixinでオプションを共通化させる
export const tokyoNumber = {
  data() {
    return {
      title: 'Welcome to Tokyo',
      subtitle: 'Tokyo is great city',
      comment: 'Comeon!',
      number: 0
    }
  },
  filters: {
    lowerCase(value) {
      return value.toLowerCase();
    }
  },
  created() {
    // mixinが２つあるので、下記は２度表示される
    console.log('created in mixin');
  }
};