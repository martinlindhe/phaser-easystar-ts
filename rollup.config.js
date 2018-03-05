import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/plugin.ts',
    output: {
        name: 'PhaserEasystar',
        file: 'build/dist/phaser-easystar.js',
        format: 'umd',
        globals: {
            'phaser-ce': 'Phaser',
            'easystarjs': 'EasyStar',
        }
    },

    plugins: [
        typescript()
    ],

    external: [ 'phaser-ce', 'easystarjs' ]
}
