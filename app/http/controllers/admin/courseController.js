const controller = require('app/http/controllers/Controller');
const validator = require('app/validate/admin/createCourseValidator');
const Course = require('app/models/course');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

class courseController extends controller {

    async index(req, res) {

            let page = req.query.page || 1;
            let courses = await Course.paginate({}, {page, sort: {createdAt: 1}, limit: 2});
            res.render('admin/courses', {courses});
    }

    create(req, res) {

            validator.validateErrorMessage('');
            res.render('admin/courses/create');

    }

    async createProcess(req, res, next) {
        validator.validateErrorMessage('');
        // check validation
        let validate = await validator.validate(req);
        if (validate) { //validation have Error

            // if (req.file) {
            //     fs.unlink(req.file.path, (err) => {
            //     });
            // }
            res.render('admin/courses/create');
        } else { //validation is OK
            this.store(req, res, next);
        }
    }

    async store(req, res, next) {

        let images = this.imageResize(req.file);
        let {title, body, type, price, tags} = req.body;

        let newCourse = new Course({
            user: req.user._id,
            title,
            slug: this.slug(title),
            body,
            type,
            price,
            images,
            tags
        });

        await newCourse.save();

        return res.redirect('/admin/courses');
    }

    async destroy(req, res) {

            let course = await Course.findById(req.params.id);
            if (!course) {
                return res.json('چنین دوره ای یافت نشد');
            }
            // delete episodes

            // delete Images

            Object.values(course.images).forEach(image => fs.unlinkSync(`./public${image}`));

            // delete courses
            course.remove();

            return res.redirect('/admin/courses');

    }

    async edit(req, res, next) {

            this.isMongoId(req.params.id);

            let course = await Course.findById(req.params.id);
            if (!course) this.error('چنین دوره ای وجود ندارد', 404);


            return res.render('admin/courses/edit', {course});

    }

    async update(req, res, next) {
            let status = await validator.validate(req);
            if (!status) {
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return this.back(req, res);
            }

            let objForUpdate = {};

            // set image thumb
            objForUpdate.thumb = req.body.imagesThumb;

            // check image
            if (req.file) {
                objForUpdate.images = this.imageResize(req.file);
                objForUpdate.thumb = objForUpdate.images[480];
            }

            delete req.body.images;
            objForUpdate.slug = this.slug(req.body.title);

            await Course.findByIdAndUpdate(req.params.id, {$set: {...req.body, ...objForUpdate}})
            return res.redirect('/admin/courses');

    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-");
    }

    imageResize(image) {

        let addressImages = {};
        addressImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        let sizes = [1080, 720, 480];
        sizes.map(size => {

            const imageInfo = path.parse(image.path);
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
            addressImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size, null)
                .toFile(`${image.destination}/${imageName}`).then(r => {
            });
        });
        return addressImages;
    }

    getUrlImage(des) {
        return des.substr(8);
    }
}

module.exports = new courseController();