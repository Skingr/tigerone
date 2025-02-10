import React from 'react';

export default function CourseDropdown({
  selectedCourse,
  setSelectedCourse
}: {
  selectedCourse: string | null;
  setSelectedCourse: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const courses = [
    'TSP', 
    'racial inequality', 
    'thesis', 
    'Statistics'
  ];

  return (
    <div className="absolute top-4 right-4">
      <select
        className="p-2 border border-cc-gold rounded-lg bg-white shadow-lg"
        value={selectedCourse || ""}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="" disabled>Select a course</option>
        {courses.map((course, index) => (
          <option key={index} value={course}>{course}</option>
        ))}
      </select>
    </div>
  );
}


