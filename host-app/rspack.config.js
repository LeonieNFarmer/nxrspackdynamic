const { withModuleFederation } = require('@nx/rspack/module-federation');
const { composePlugins, withNx, withReact } = require('@nx/rspack')

function withCustomFactory(config) {
  const customConfig = {
   ...config,
   module: {
     ...config.module,
     parser: {
       ...config.parser,
       /**
        * Enable css module default imports by setting namedExports to false (e.g., import styles from './App.module.scss').
        *
        * When namedExports is true you must:
        *
        * Use namespaced depending on your tsconfig settings (e.g., import * as styles from './App.module.scss')
        * Use named imports (e.g., import { container, header, text } from './App.module.scss')
        *
        * @see https://www.rspack.dev/guide/tech/css#css-modules
        */
       'css/auto': {
         namedExports: false,
       },
     },
     rules: [
       ...config.module.rules,
       // 👇 Enable `*.module.css` (they don't work too with current @nx/rspack setup)
       {
         test: /\.css$/,
         type: 'css/auto'
       },
       // 👇 Enable  `*.module.sass` and `*.module.scss`
       {
         test: /\.(sass|scss)$/,
         use: [
           {
             loader: 'sass-loader',
             options: {
               api: 'modern-compiler', // `modern-compiler` and `sass-embedded` improves build performance
               implementation: require.resolve('sass-embedded'),
             },
           },
         ],
         type: 'css/auto', // 'css/auto' to support '*.module.(scss|sass)' as CSS Module
       },
     ],
   },
 }

 return customConfig
}

module.exports = composePlugins(withNx(), withReact(), withModuleFederation({
  name: 'host-app',
 shared: (libraryName) => {
    // Customize behavior for specific libraries
    if (libraryName === 'react' || libraryName === 'react-dom') {
      return { singleton: true, eager: true }; // Shared as singleton
    }
    return false; // Not shared for other libraries
  },
},{dts: false}), withCustomFactory);
