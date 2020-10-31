const adminProtect = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Недостаточно прав для просмотра страницы (доступно только администраторам)")
    }
}

export { adminProtect };