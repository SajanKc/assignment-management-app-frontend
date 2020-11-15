import React, { useState } from "react";
import AssignmentDataService from "../services/AssignmentService";

const AddAssignment = (props) => {
  const initialAssignmentState = {
    id: null,
    subject: "",
    description: "",
    submissionDate: "",
    completed: false,
  };

  const [assignment, setAssignment] = useState(initialAssignmentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const saveAssignment = () => {
    let data = {
      subject: assignment.subject,
      description: assignment.description,
      submissionDate: assignment.submissionDate,
    };

    AssignmentDataService.create(data)
      .then((response) => {
        setAssignment({
          id: response.data.id,
          subject: response.data.subject,
          description: response.data.description,
          submissionDate: response.data.submissionDate,
          completed: response.data.completed,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newAssignment = () => {
    setAssignment(initialAssignmentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h3>Assignment Added Successfully!</h3>
          <button className="btn btn-success" onClick={newAssignment}>
            Add New Assignment
          </button>
          <button
            className="btn btn-primary ml-3"
            onClick={() => props.history.push("/")}
          >
            Go Home
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              required={true}
              autoFocus={true}
              value={assignment.subject}
              placeholder="subject"
              onChange={handleInputChange}
              name="subject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required={true}
              value={assignment.description}
              placeholder="description"
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="submissionDate">Submission Date</label>
            <input
              type="text"
              className="form-control"
              id="submissionDate"
              required={true}
              value={assignment.submissionDate}
              placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
              name="submissionDate"
            />
          </div>
          <button
            onClick={saveAssignment}
            className="btn btn-success"
            disabled={
              assignment.subject.length >= 2 &&
              assignment.description.length >= 10 &&
              assignment.submissionDate.length >= 8
                ? false
                : true
            }
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAssignment;
