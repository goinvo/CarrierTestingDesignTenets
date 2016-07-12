module.exports = {
	build: {
		expand: true,
		cwd: './assets/css',
		src: ['**/*.css', '!**/*.min.css'],
		dest: '_build/css',
		ext: '.min.css'
	}
}