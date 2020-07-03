const controller = require('app/http/controllers/Controller');
//Validator Create Course
const validator = require('app/validate/admin/createCourseValidator');
//Course model
const Course = require('app/models/course');
//convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images
const sharp = require('sharp');

const path = require('path');
const fs = require('fs');

class courseController extends controller {

    async index(req, res) {
        try {
            //get page from url
            let page = req.query.page || 1;
            //mongoosePaginate Plugin
            let courses = await Course.paginate({}, {page, sort: {createdAt: 1}, limit: 2});
            res.render('admin/courses', {courses});
        } catch (err) {
            next(err);
        }
    }

    // Create Course Form
    async create(req, res) {
        try {
            //reset all validation error
            await validator.validateErrorMessage('');
            res.render('admin/courses/create');
        } catch (err) {
            next(err);
        }
    }

    //Post Process
    async createProcess(req, res, next) {
        try {
            //reset all validation error
            await validator.validateErrorMessage('');
            // check validation
            let validate = await validator.validate(req);
            if (validate) { //validation have Error
                //when validation have error Delete uploaded Images
                if (req.file) fs.unlink(req.file.path, (err) => {
                });
                res.render('admin/courses/create');
            } else { //validation is OK
                //store course to database
                this.store(req, res, next);
            }
        } catch (err) {
            next(err);
        }
    }

    //store course to database
    async store(req, res, next) {
        try {
            //imageResize return address of images resized to defined destination
            let images = await this.imageResize(req.file);
            //get all values form
            let {title, body, type, price, tags} = req.body;

            //create newCourse model
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
            //save course to database
            await newCourse.save();
            //back to courses Page
            return res.redirect('/admin/courses');
        } catch (err) {
            next(err);
        }
    }

    //delete course
    async destroy(req, res) {
        try {
            //find course by id in request params : /courses/:id
            let course = await Course.findById(req.params.id);
            if (!course) { //course doesn't exist
                return res.json('چنین دوره ای یافت نشد');
            }
            // delete episodes

            // delete Images
            await Object.values(course.images).forEach(image => fs.unlinkSync(`./public${image}`));

            // delete courses
            await course.remove();

            return res.redirect('/admin/courses');
        } catch (err) {
            next(err);
        }
    }

    //edit course
    async edit(req, res, next) {
        try {
            //validator check the req.params in url is mongoId or NOT
            this.isMongoId(req.params.id);
            //find course by id in request params : /courses/:id
            let course = await Course.findById(req.params.id);
            // if course exist in MongoDB
            if (!course) this.error('چنین دوره ای وجود ندارد', 404); // 404 not found
            return res.render('admin/courses/edit', {course});
        } catch (err) {
            next(err);
        }
    }

    //update course in POST method
    async update(req, res, next) {
        try {
            // check validation
            let status = await validator.validate(req);
            if (!status) { //validation have Error
                //when validation have error Delete uploaded Images
                if (req.file) fs.unlinkSync(req.file.path);
                return this.back(req, res);
            }

            let objForUpdate = {};
            // set image thumb
            objForUpdate.thumb = req.body.imagesThumb;

            //image Exist
            if (req.file) {
                objForUpdate.images = this.imageResize(req.file);
                objForUpdate.thumb = objForUpdate.images[480];
            }

            delete req.body.images;
            objForUpdate.slug = this.slug(req.body.title);

            await Course.findByIdAndUpdate(req.params.id, {$set: {...req.body, ...objForUpdate}});
            return res.redirect('/admin/courses');
        } catch (err) {
            next(err);
        }

    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-");
    }

    //resize images
    imageResize(image) {

        let addressImages = {};
        addressImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);
        // image size to resize
        let size = [1080, 720, 480];
        size.map(size => {

            const imageInfo = path.parse(image.path);
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
            addressImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);
            //sharp config
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