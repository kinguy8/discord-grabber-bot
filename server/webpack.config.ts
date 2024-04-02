// import path from 'path';
// import { Configuration, ContextReplacementPlugin } from 'webpack';
// import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

// export default (env: any) => {
//   const config: Configuration = {
//     mode: env.mode ?? 'development',
//     target: 'node',
//     entry: path.resolve(__dirname, 'src', 'index.ts'),
//     output: {
//       filename: '[name].[contenthash].js',
//       path: path.resolve(__dirname, 'dist'),
//       clean: true,
//     },
//     module: {
//       rules: [
//         {
//           test: /\.ts?$/,
//           use: 'ts-loader',
//           exclude: /node_modules/,
//         },
//       ],
//     },
//     resolve: {
//       extensions: ['.ts', '.js'],
//     },
//     devServer: {
//       static: {
//         directory: path.join(__dirname, 'public'),
//       },
//       open: true,
//     },
//   };

//   return config;
// };
