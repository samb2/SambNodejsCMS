class AdminController {

    index(req, res) {
        res.render('admin/index');
    }
}

module.exports = new AdminController();