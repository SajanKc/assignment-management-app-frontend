import React, { useState, useEffect } from "react";
import AssignmentService from "../services/AssignmentService";

const AssignmentList = (props) => {
  const [assignments, setAssignments] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchSubject, setSearchSubject] = useState("");

  useEffect(() => {
    retrieveAssignments();
  }, []);

  const retrieveAssignments = () => {
    AssignmentService.getAll()
      .then((response) => {
        setAssignments(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log("Cannot establish connection with backend : " + error);
      });
  };

  const refreshList = () => {
    retrieveAssignments();
    setCurrentAssignment(null);
    setCurrentIndex(-1);
  };

  const setActiveAssignment = (assignment, index) => {
    setCurrentAssignment(assignment);
    setCurrentIndex(index);
  };

  const onChangeSearchSubject = (event) => {
    const searchSubjectValue = event.target.value;
    setSearchSubject(searchSubjectValue);
  };

  const findBySubject = () => {
    AssignmentService.getBySubject(searchSubject)
      .then((response) => {
        setAssignments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveAll = () => {
    if (window.confirm("Are you sure want to remove all assignments ?")) {
      removeAllAssignments();
    }
  };

  const removeAllAssignments = () => {
    AssignmentService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm("Are you sure want to remove assignment ?")) {
      removeAssignment(id);
    }
  };

  const removeAssignment = (id) => {
    AssignmentService.remove(id)
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditAssignment = (id) => {
    console.log("Edit clicked");
    props.history.push(`/assignments/${id}`);
    editAssignment(id);
  };

  const editAssignment = (id) => {
    AssignmentService.update(id, currentAssignment)
      .then((response) => {
        setCurrentAssignment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            disabled={true}
            type="text"
            className="form-control"
            placeholder="Search by Subject"
            value={searchSubject}
            onChange={onChangeSearchSubject}
          />

          <div className="input-group-append">
            <button
              disabled={true}
              className="btn btn-outline-secondary"
              type="button"
              onClick={findBySubject}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <h4>Assignments List</h4>
        <ul className="list-group">
          {assignments &&
            assignments.map((assignment, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAssignment(assignment, index)}
                key={index}
              >
                {`${index + 1}. `}
                {assignment.subject}
              </li>
            ))}
        </ul>

        <button
          className="btn btn-danger my-3"
          disabled={assignments ? false : true}
          onClick={handleRemoveAll}
        >
          Remove All Assignment
        </button>
      </div>
      <div className="col-md-6">
        {currentAssignment ? (
          <div>
            <h4>
              <b>Assignment</b>
            </h4>
            <div>
              <label>
                <strong>Subject : </strong>
              </label>{" "}
              {currentAssignment.subject}
            </div>
            <div>
              <label>
                <strong>Description : </strong>
              </label>{" "}
              {currentAssignment.description}
            </div>
            <div>
              <label>
                <strong>Submission Date : </strong>
              </label>{" "}
              {currentAssignment.submissionDate}
            </div>
            <div>
              <label>
                <strong>Status : </strong>
              </label>{" "}
              {currentAssignment.completed ? "Completed" : "Pending"}
            </div>

            <button
              className="btn btn-warning"
              onClick={() => handleEditAssignment(currentAssignment.id)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger ml-3"
              onClick={() => handleDeleteAssignment(currentAssignment.id)}
            >
              X
            </button>
          </div>
        ) : (
          <div>
            <br />
            {assignments ? (
              <p>Please click on Assignment...</p>
            ) : (
              <>
                <p>Zero Assignments remaining</p>
                <button
                  className="btn btn-success"
                  onClick={() => props.history.push("/add")}
                >
                  Add Assignment
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
