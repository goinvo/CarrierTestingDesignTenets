module.exports = {
	build: {
		options: {
		    ASCIIOnly: true,
		    compress: {
		        drop_console: true
		      }
		},
		files: [{
			expand: true,
			src: ['js/scripts.js'],
			dest: '_build',
			ext: '.min.js'
		}]
		
	}
}