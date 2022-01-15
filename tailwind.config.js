module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.tsx',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            width:{
                128:'32rem'
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['disabled'],
            cursor: ['hover', 'focus', 'disabled'],
            borderWidth: ['hover', 'focus'],
            borderColor: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'group-focus'],
            borderOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'group-focus'],
        },
        backgroundColor: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'group-focus'],
        boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'group-focus'],
        opacity: ['disabled', 'hover', 'group-hover'],
        scale: ['hover', 'group-hover'],
        translate: ['hover', 'group-hover'],
        transitionProperty: ['hover', 'group-hover', 'focus'],
        width: ['hover', 'group-hover', 'focus'],
    },
    plugins: [],
}
