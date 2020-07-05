const controller = require('app/http/controllers/Controller');
const User = require('app/models/user');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

class CourseController extends controller {

    async index(req, res) {
        let courses = await Course.find({});
        res.render('courses', {courses});
    }

    async single(req, res) {

        let course = await Course.findOne({slug: req.params.course})
            .populate([
                {
                    path: 'user',
                    select: 'name'
                },
                {
                    path: 'episodes',
                    options: {sort: {number: 1}}
                }
            ])
            .populate([
                {
                    path: 'comments',
                    match: {
                        parent: null,
                        approved: true
                    },
                    populate: [
                        {
                            path: 'user',
                            select: 'name'
                        },
                        {
                            path: 'comments',
                            match: {
                                approved: true
                            },
                            populate: {path: 'user', select: 'name'}
                        }
                    ]
                }
            ]);
        let canUserUse = await this.canUse(req, course);
        res.render('single-course', {course, canUserUse});
        //return res.json(course);
        //console.log(course);

    }


    async download(req, res, next) {
        const episodeID = req.params.episode;
        this.isMongoId(episodeID);

        let episode = await Episode.findById(episodeID);

        if (!episode) this.error("not found", 404);

        if (!this.checkHash(req, episode)) this.error('اعتبار لینک شما به پایان رسیده است', 403);

        //console.log(episode);
        let filePath = path.resolve(`./public/${episode.videoUrl}`);
        if (!fs.existsSync(filePath)) this.error('چنین فایل برای دانلود وجود دارد', 404);
        return res.download(filePath);
    }

    async canUse(req, course) {
        let canUse = false;
        if (req.isAuthenticated()) {
            switch (course.type) {
                case 'vip':
                    canUse = req.user.isVip();
                    break;
                case 'cash':
                    canUse = req.user.checkLearning(course);
                    break;
                default:
                    canUse = true;
                    break;
            }
        }
        return canUse;
    }

    checkHash(req, episode) {
        let timestamps = new Date().getTime();
        if (req.query.t < timestamps) return false;

        let text = `aQTR@!#Fa#%!@%SDQGGASDF${episode.id}${req.query.t}`;

        return bcrypt.compareSync(text, req.query.mac);
    }

}

module.exports = new CourseController();