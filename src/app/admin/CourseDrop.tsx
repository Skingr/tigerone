import React, { useEffect, useState } from "react";

type CourseDropdownProps = {
  selectedCourse: string | null;
  setSelectedCourse: React.Dispatch<React.SetStateAction<string | null>>;
  disabled?: boolean;
};

export default function CourseDropdown({
  selectedCourse,
  setSelectedCourse,
  disabled = false,
}: CourseDropdownProps) {
  const [courses, setCourses] = useState<{
    userClass: string;
    }[]>();
  
  
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/getCourses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);
  //console.log(courses)

  return (
    <div
      className={`${
        selectedCourse == null
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          : "absolute top-4 right-4"
      }`}
    >
      <select
        className="p-2 border border-cc-gold rounded-lg bg-white shadow-lg"
        value={selectedCourse || ""}
        onChange={(e) => setSelectedCourse(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>
          Select a course
        </option>
        {courses?.map((course, index) => (
          <option key={index} value={course.userClass}>
            {course.userClass}
          </option>
        ))}
      </select>
    </div>
  );
}
