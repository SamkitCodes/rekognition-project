"use client";

import React, { useState } from "react";

export default function Page() {
  const [emails, setEmails] = useState([""]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    if (emails.length < 5) {
      setEmails([...emails, ""]);
    } else {
      alert("You can only add up to 5 email addresses.");
    }
  };

  const removeEmailField = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    emails.forEach((email) => {
      if (email) {
        formData.append("emails[]", email);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    alert("Form submitted. Check console for details.");
  };

  return (
    <div className="container">
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imageUpload">Select Image:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Emails (optional, up to 5):</label>
          {emails.map((email, index) => (
            <div key={index} className="email-field">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmailField(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {emails.length < 5 && (
            <button
              type="button"
              onClick={addEmailField}
              className="add-button"
            >
              Add Another Email
            </button>
          )}
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>

      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 3rem auto;
          padding: 2rem;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: #333;
          text-align: center;
        }
        h1 {
          margin-bottom: 1.5rem;
          font-size: 2.5rem;
          color: #343a40;
          font-weight: 700;
        }
        .form-group {
          margin-bottom: 1.5rem;
          text-align: left;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        input[type="file"],
        input[type="email"] {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 5px;
          margin-top: 0.5rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }
        input[type="file"]:focus,
        input[type="email"]:focus {
          border-color: #80bdff;
        }
        .email-field {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .email-field input[type="email"] {
          flex: 1;
          margin-right: 0.5rem;
        }
        .add-button,
        .remove-button,
        .submit-button {
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .add-button {
          background-color: #28a745;
          color: #fff;
        }
        .add-button:hover {
          background-color: #218838;
        }
        .remove-button {
          background-color: #dc3545;
          color: #fff;
        }
        .remove-button:hover {
          background-color: #c82333;
        }
        .submit-container {
          text-align: center;
          margin-top: 2rem;
        }
        .submit-button {
          background-color: #007bff;
          color: #fff;
        }
        .submit-button:hover {
          background-color: #0069d9;
        }
      `}</style>
    </div>
  );
}
