import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [filters, setFilters] = useState({ category: "", price: 0, rating: 0 });
    const [page, setPage] = useState(1);

    // Fetch courses from backend (simulate with static data for now)
    useEffect(() => {
        axios
            .get(`/api/courses?page=${page}`, { params: filters })
            .then((res) => setCourses((prev) => [...prev, ...res.data]))
            .catch((err) => console.error(err));
    }, [page, filters]);

    return (
        <CourseContext.Provider value={{ courses, setFilters, setPage }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => React.useContext(CourseContext);