const init = 0.5
const typewriterSpeed = 2.5

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        {
            pattern: /text-/,
        },
    ],
    theme: {
        fontFamily: {
            sans: ['Acherus Grotesque', 'sans-serif'], //100, 200, 300, 400, 500, 700, 800, 900
            'cursive': ['Adobe Caslon Pro', 'sans'], //500, 600, 700
        },
        container: {
            center: true,
        },
        extend: {
            borderRadius: {
                'none': '0',
                'sm': `${init / 4}rem`,
                DEFAULT: `${init / 2}rem`,
                'lg': `${init}rem`,
                'full': '99999px',
            },
            fontWeight: {
                '100': 100,
                '200': 200,
                '300': 300,
                '400': 400,
                '500': 500,
                '600': 600,
                '700': 700,
                '800': 800,
                '900': 900,
            },
            fontSize: {
                'h1': `${init * 3.75}rem`,
                'h2': `${init * 3.45}rem`,
                'h3': `${init * 3.05}rem`,
                'h4': `${init * 2.7}rem`,
                'h5': `${init * 2.35}rem`,
                'h6': `${init * 2}rem`,
                'sm': `${init * 1.75}rem`,
                'xs': `${init * 1.5}rem`,
            },
            zIndex: {
                '100': '100',
                'toast': 91
            },
            colors: {
                theme: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
            },
            animation: {
                typewriter: `typewriter 2.5s steps(26) 1s forwards`,
                typewriterCursor: `blink 250ms infinite alternate-reverse`
            },
            keyframes: {
                typewriter: {
                    to: {
                        left: `100%`
                    }
                },
                blink: {
                    to: {
                        background: `transparent`
                    }
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar-hide')
    ],
}
