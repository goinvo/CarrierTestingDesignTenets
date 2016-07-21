module.exports = {
    dev: {
        options: {
            style: 'expanded'
        },
        files: [
            {
                expand: true,
                cwd: 'scss',
                src: ['main.scss', 'home.scss'],
                dest: 'css',
                ext: '.css'
            }
        ]
    }
}
