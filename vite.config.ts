import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5000
	},
	resolve: {
		alias: {
			'@public': path.resolve(__dirname, './public/'),
			'@app': path.resolve(__dirname, './src/app'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@features': path.resolve(__dirname, './src/features'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@shared': path.resolve(__dirname, './src/shared')
		}
	}
})
