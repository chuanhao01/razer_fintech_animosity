const middlewares = {
    init(app){
        // Check if the user is logged in
        app.use(function(req, res, next){
            const whitelistedPaths = [
                '/login',
                '/register',
                '/logout'
            ];
            if(whitelistedPaths.includes(req._parsedOriginalUrl.pathname)){
                next();
            }
            else{
                if(req.user){
                    next();
                }
                else{
                    res.status(403).send();
                }
            }
        });
    }
};

module.exports = middlewares;