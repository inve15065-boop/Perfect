import React, { useEffect, useState } from "react";
import { getSkills } from "../../api/skills";

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await getSkills();
      setSkills(data);
    };
    fetchSkills();
  }, []);

  return (
    <div>
      <h2>Your Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill._id}>
            <strong>{skill.title}</strong> - {skill.framework}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
