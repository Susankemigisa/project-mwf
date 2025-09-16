// ensure the user is authenticated
exports.ensureautheticated = (req,res,next)=>{
    if(req.session.user){
        return next()
    }
    res.redirect('/login')
};

// ensure the user is a salesagent
exports.ensureAgent = (req,res,next)=>{
    if(req.session.user && req.session.user.role==="Attendant"){
        return next()
    }
    res.redirect('/')
};

// ensure the user is a manager
exports.ensureManager = (req,res,next)=>{
    if(req.session.user && req.session.user.role==="Manager"){
        return next()
    }
    res.redirect('/')
};