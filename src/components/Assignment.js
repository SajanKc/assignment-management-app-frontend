import React, { useState, useEffect } from "react";
import AssignmentService from "../services/AssignmentService";

const Assignment = (props) => {
  const initialAssignmentState = {
    id: null,
    subject: "",
    description: "",
    submissionDate: "",
    completed: false,
  };

  const [currentAssignment, setCurrentAssignment] = useState(
    initialAssignmentState
  );
  const [message, setMessage] = useState("");

  const getAssignment = (id) => {
    AssignmentService.get(id)
      .then((response) => {
        setCurrentAssignment(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssignment();
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAssignment({ ...currentAssignment, [name]: value });
  };

  const updateSubmitted = (status) => {
    var data = {
      id: currentAssignment.id,
      subject: currentAssignment.subject,
      description: currentAssignment.description,
    };

    AssignmentService.update(currentAssignment.id, data)
      .then((response) => {
        setCurrentAssignment({ ...currentAssignment, completed: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateAssignment = () => {
    AssignmentService.update(currentAssignment.id, currentAssignment)
      .then((response) => {
        console.log(response.data);
        setMessage("The assignment was updated successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAssignment = () => {
    AssignmentService.remove(currentAssignment.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/assignments");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {currentAssignment ? (
        <div className="edit-form">
          <h4>Assignment</h4>
          <form>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={currentAssignment.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentAssignment.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="submissionDate">Submission Date</label>
              <input
                type="text"
                className="form-control"
                id="submissionDate"
                name="submissionDate"
                value={currentAssignment.submissionDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status : </strong>
              </label>
              {currentAssignment.completed ? " Completed" : " Not Completed"}
            </div>
          </form>

          {currentAssignment.completed ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateSubmitted(false)}
            >
              UnSubmit
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateSubmitted(true)}
            >
              Submit
            </button>
          )}

          <button className="btn btn-danger mr-2" onClick={deleteAssignment}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateAssignment}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Assignment...</p>
        </div>
      )}
    </div>
  );
};

export default Assignment;
