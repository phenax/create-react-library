
# create-react-library
Boilerplate generator for creating npm packages


## To generate boilerplate

#### React component
npx create-npm-library react-component -o directory --name package-name

#### Vanilla js library
npx create-npm-library vanilla -o directory --name package-name


## To publish your package 

1. Log in to your account.
`yarn login` # Enter your credentials

2. Publish!
`yarn publish --access=public`


## To test your package locally

1. In your package directory
`npm link`

2. In your project root
`npm link {{package-name}}`

