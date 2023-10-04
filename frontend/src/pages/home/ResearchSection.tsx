import React from "react";

const ResearchSection: React.FC = () => {
  const researchAreas = [
    "Artificial Intelligence",
    "Data Science",
    "Human-Computer Interaction",
    "Software Engineering",
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Research</h2>
        <ul className="list-disc list-inside">
          {researchAreas.map((area, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResearchSection;
