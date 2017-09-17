import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'build/ts/plugin.js',
    sourcemap: false,
    name: "PhaserEasystar",
    output: {
        file: 'build/dist/phaser-easystar.js',
        format: 'iife',
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs({
            ignoreGlobal: true,
            namedExports: {
                'node_modules/easystarjs/src/easystar.js': [ 'js' ]
              }
        })
    ],
    onwarn: function (warning) {
        // Suppress useless error message, https://github.com/rollup/rollup/issues/794
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (warning.code === 'THIS_IS_UNDEFINED') {
            return;
        }
        console.error("Rollup warning:", warning.message);
    }
}
