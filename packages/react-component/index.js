
module.exports = ({ args, params }) => {
  
  return {
    templateDirGlob: './template/**/*',
    data: {
      package_name: 'hello_world',
      package_description: 'cool',
    },
  };
};
