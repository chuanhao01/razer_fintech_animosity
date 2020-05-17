const middlewares = {
    init(app){
        app.use(function(req, res, next){
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        // Check if the user is logged in
        // app.use(function(req, res, next){
        //     const whitelistedPaths = [
        //         '/login',
        //         '/register',
        //         '/logout'
        //     ];
        //     if(whitelistedPaths.includes(req._parsedOriginalUrl.pathname)){
        //         next();
        //     }
        //     else{
        //         if(req.user){
        //             next();
        //         }
        //         else{
        //             res.status(403).send();
        //         }
        //     }
        // });
    }
};

module.exports = middlewares;