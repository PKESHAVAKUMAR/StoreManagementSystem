"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../../Models/AdminModels/ProductModel"));
// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
// Create a new course
class CourseController {
    // static async createCourse(req: Request, res: Response) {
    //     try {
    //         const { Admin_id, title, description, image } = req.body;
    //         const file = req.files as Express.Multer.File[];
    //         const image = req.file.filename;
    //         const course = new Course({
    //             Admin_id,
    //             title,
    //             description,
    //             image,
    //         });
    //         const savedCourse = await course.save();
    //         res.status(201).json(savedCourse);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Could not create the course.' });
    //     }
    // };
    static createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Admin_id, title, description } = req.body;
                // Check if req.file is defined
                if (req.file) {
                    const image = req.file.filename; // Get the uploaded image filename
                    const course = new ProductModel_1.default({
                        Admin_id,
                        title,
                        description,
                        image,
                    });
                    const savedCourse = yield course.save();
                    res.status(201).json(savedCourse);
                }
                else {
                    res.status(400).json({ error: 'No file uploaded.' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Could not create the course.' });
            }
        });
    }
    // Get all courses
    static getAllCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield ProductModel_1.default.find().populate('Admin_id'); // Use populate to include Admin details
                res.json(courses);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not fetch courses.' });
            }
        });
    }
    ;
    // Get a specific course by ID
    static getCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const course = yield ProductModel_1.default.findById(courseId).populate('Admin_id'); // Use populate to include Admin details
                if (!course) {
                    return res.status(404).json({ error: 'Course not found.' });
                }
                res.json(course);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not fetch the course.' });
            }
        });
    }
    ;
    // Update a course by ID
    static updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let courseId = req.params.id;
                console.log("courseID", courseId);
                if (req.file) {
                    // The image file will be available in req.file
                    const updatedCourse = Object.assign(Object.assign({}, req.body), { img_url: req.file.filename });
                    let course = yield ProductModel_1.default.findOneAndUpdate({ _id: courseId }, updatedCourse, { new: true });
                    if (!course) {
                        return res.status(404).send('No course found');
                    }
                    res.send(updatedCourse);
                }
                else {
                    let updatedCourse = Object.assign({}, req.body);
                    let course = yield ProductModel_1.default.findOneAndUpdate({ _id: courseId }, updatedCourse, { new: true });
                    if (!course) {
                        return res.status(404).send('No course found');
                    }
                    res.send(updatedCourse);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    // Delete a course by ID
    static deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const deletedCourse = yield ProductModel_1.default.findByIdAndRemove(courseId);
                if (!deletedCourse) {
                    return res.status(404).json({ error: 'Course not found.' });
                }
                res.json(deletedCourse);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not delete the course.' });
            }
        });
    }
    ;
    // static async getAdminCoursesById(req: Request, res: Response) {
    //     try {
    //         const adminId = req.params.adminId;
    //         const courses = await Course.find({ 'Admin_id._id': adminId });
    //         res.json(courses);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // };
    // get courses by particular admin id
    static getCoursesByAdminID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminId = req.params.adminId; // Change this line
                const courses = yield ProductModel_1.default.find({ Admin_id: adminId });
                res.json(courses);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // Search for courses based on a search query
    static searchCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.params.query;
                // Use a regular expression to perform a case-insensitive search
                const regex = new RegExp(query, 'i');
                const courses = yield ProductModel_1.default.find({
                    $or: [
                        { title: { $regex: regex } },
                        { description: { $regex: regex } },
                    ],
                }).populate('Admin_id');
                res.json(courses);
            }
            catch (error) {
                res.status(500).json({ error: 'Could not perform the search.' });
            }
        });
    }
}
exports.default = CourseController;
