const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .ts('resources/js/app.tsx', 'public/js')
  .react()
  .extract(['react'])
  .browserSync('http://127.0.0.1:8000/')

mix.postCss('resources/css/app.css', 'public/css/app.css', [
  require('tailwindcss'),
])

if (mix.inProduction()) {
  mix.version()
}
