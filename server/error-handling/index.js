module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.log('error', req.method, req.path, err)
        if (!res.headersSent) { res.status(500).json({errorMessage: 'internal server error'})}
    })
}