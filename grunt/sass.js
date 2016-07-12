module.exports = {
    dev: {
        options: {
            style: 'expanded'
        },
        files: [
            {
                expand: true,
                cwd: 'scss',
                src: ['main.scss'],
                dest: 'css',
                ext: '.css'
            }
        ]
    }
}
