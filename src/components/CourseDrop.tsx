import React from 'react';

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
  const courses = [
    'TSP',
    'racial inequality',
    'thesis',
    'Statistics',
  ];

  return (
    <div
      className={`${
        selectedCourse == null? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50":"absolute top-4 right-4"}`
        }
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
        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>
  );
}