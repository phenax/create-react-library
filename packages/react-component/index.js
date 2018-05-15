
module.exports = ({ args }) => {
  
  return {
    ignore: /node_modules/gi,
    data: {
      package_name: 'hello_world',
      package_description: 'cool',
    },
  };
};
