// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxt/image'],
	image: {
		//dir: 'assets/img/',
		// provider: 'twicpics',
		// twicpics: {
		// 	baseURL: 'https://weblinex.ru/images/',
		// },
	},
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
