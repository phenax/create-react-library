
module.exports = ({ args }) => {

  const params = {
    ignore: /node_modules/gi,
    data: {
      package_name: args.name,
      package_description: 'cool',
    },
  };

  if(!args.name || args.name.length < 3) {
    console.log('You need to specify the package name');
    params.preventExecution = true;
  }

  return params;
};
