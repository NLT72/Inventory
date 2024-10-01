export const auth=(req, res, next)=>{
    if(req.session.usermail){
        next()
    }else{
        res.redirect('/login');
    }
}