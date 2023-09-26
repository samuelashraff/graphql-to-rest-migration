import React, { useState, useEffect } from 'react';

const StudyList = () => {
  const [studies, setStudies] = useState([]);

    const db = [
        {
            "id": "1",
            "title": "first"
        },
        {
            "id": "2",
            "title": "second"
        }]

  useEffect(() => {
    setStudies(db);
  }, []);

  return (
    <div>
      <h2>Study List</h2>
      <ul>
        {studies.map(study => (
          <li key={study.id}>{study.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudyList;