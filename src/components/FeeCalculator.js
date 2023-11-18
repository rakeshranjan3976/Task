import React, { useState } from 'react';

const fees = {
  "Exam Fee": {
    "INDIAN": {
      "ALL_COURSES​": {
        "ALL_LEVEL​": {
          "amount": 400
        }
      }
    },
    "FOREIGN": {
      "ALL_COURSES​": {
        "ALL_LEVEL​": {
          "amount": 100
        }
      }
    },
    "NRI": {
      "ALL_COURSES​": {
        "ALL_LEVEL​": {
          "amount": 600
        }
      }
    },
    "SAARC": {
      "ALL_COURSES​": {
        "ALL_LEVEL​": {
          "amount": 600
        }
      }
    }
  },
  "Application Fee": {
    "INDIAN": {
      "ALL_COURSES​": {
        "UG": {
          "amount": 200
        },
        "UG-DIPLOMA": {
          "amount": 300
        },
        "PG": {
          "amount": 500
        }
      }
    },
    "FOREIGN": {
      "ALL_COURSES​": {
        "UG": {
          "amount": 400
        },
        "UG-DIPLOMA": {
          "amount": 400
        },
        "PG": {
          "amount": 700
        }
      }
    }
  }
};

const FeeCalculator = () => {
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [resultingFee, setResultingFee] = useState(null);

  
  const handleFeeSelection = (feeType) => {
    setSelectedFee(feeType);
    setSelectedNationality(null);
    setSelectedCourse(null);
    setSelectedLevel(null);
    setResultingFee(null);
  };
  
  const handleNationalitySelection = (nationality) => {
    setSelectedNationality(nationality);
    setSelectedCourse(null);
    setSelectedLevel(null);
    setResultingFee(null);
  };
  
  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    setSelectedLevel(null);
    setResultingFee(null);
  };
  
  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
    calculateResultingFee(level);
  };
  
  const coursesList = selectedFee === "Exam Fee" ? ["Medical", "Dental", "Ayurveda"] : Object.keys(fees[selectedFee]?.[selectedNationality] || {});
  const levelsList = selectedCourse === "ALL_COURSES" ? ["UG", "PG", "DIPLOMA", "Ph.D"] : Object.keys(fees[selectedFee]?.[selectedNationality]?.[selectedCourse] || {});

  const calculateResultingFee = (level) => {
    if (selectedFee && selectedNationality && selectedCourse && level) {
      const feeAmount = fees[selectedFee][selectedNationality][selectedCourse][level]?.amount;
      setResultingFee(feeAmount || 'Error');
    }
  };

  console.log('---', selectedCourse);
  console.log('0000', selectedLevel);
  console.log('1111', coursesList);
  console.log('2222', levelsList);

  return (
    <div className="FeeContainer">
      <h2>Select Fee:</h2>
      <select onChange={(e) => handleFeeSelection(e.target.value)}>
        <option value="">Select Fee</option>
        {Object.keys(fees || {}).map((feeType, index) => (
          <option key={index} value={feeType}>{feeType}</option>
        ))}
      </select>

      {selectedFee && (
        <div>
          <h2>Select Nationality:</h2>
          <select onChange={(e) => handleNationalitySelection(e.target.value)}>
            <option value="">Select Nationality</option>
            {Object.keys(fees[selectedFee] || {}).map((nationality, index) => (
              <option key={index} value={nationality}>{nationality}</option>
            ))}
          </select>
        </div>
      )}

      {selectedNationality && (
        <div>
          <h2>Select Course:</h2>
          <select onChange={(e) => handleCourseSelection(e.target.value)}>
            <option value="">Select Course</option>
            {coursesList.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
      )}

      {selectedCourse && (
        <div>
          <h2>Select Course Level:</h2>
          <select onChange={(e) => handleLevelSelection(e.target.value)}>
            <option value="">Select Course Level</option>
            {levelsList.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
      )}
      
      {resultingFee && (
        <div>
          <h2>Resulting Fee:</h2>
          <p>{resultingFee}</p>
        </div>
      )}
    </div>
  );
};

export default FeeCalculator;
