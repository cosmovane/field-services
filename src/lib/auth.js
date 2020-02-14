module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/signin')
    },

    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/')
    },

    adminIsLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.isAdmin){
                return next()
            } else {
                return res.redirect('/')
            }
        } else {
            return res.redirect('/signin')
        }
    }
}