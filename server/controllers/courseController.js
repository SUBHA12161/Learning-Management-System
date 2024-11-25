const Course = require("../models/Course");
const mongoose = require("mongoose");

const createCourse = async (req, res) => {
    try {
        const { title, description, price, category, outline } = req.body;

        if (!title || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const image = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
        const videoUrl = req.files?.video ? `/uploads/${req.files.video[0].filename}` : null;

        const parsedOutline = outline ? JSON.parse(outline) : [];

        const course = await Course.create({
            title,
            description,
            price,
            category,
            image,
            videoUrl,
            outline: parsedOutline,
            instructor: req.user.id,
        });

        res.status(201).json({ status: "success", course });
    } catch (err) {
        res.status(400).json({ message: "Error creating course", error: err.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, price, rating } = req.query;

        const query = {};
        if (category) query.category = category;
        if (rating) {
            const ratingValue = parseFloat(rating);
            query.rating = { $gte: ratingValue, $lt: ratingValue + 1 };
        }

        const sort = {};
        if (price === "asc") sort.price = 1;
        if (price === "desc") sort.price = -1;

        const courses = await Course.find(query)
            .sort(sort)
            .skip((page - 1) * Number(limit))
            .limit(Number(limit))
            .lean();

        const totalCourses = await Course.countDocuments(query);

        res.status(200).json({
            status: "success",
            totalCourses,
            currentPage: Number(page),
            totalPages: Math.ceil(totalCourses / limit),
            courses,
        });
    } catch (err) {
        res.status(400).json({ message: "Error fetching courses", error: err.message });
    }
};


const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ message: "Invalid course ID" });
        }

        const course = await Course.findById(courseId).lean();

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ status: "success", course });
    } catch (error) {
        res.status(500).json({ message: "Error fetching course details", error: error.message });
    }
};

module.exports = { createCourse, getCourses, getCourseById };