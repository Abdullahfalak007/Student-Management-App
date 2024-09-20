import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const StudentForm = ({ addStudent, updateStudent, editingStudent }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      studentClass: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Required"),
      age: Yup.number()
        .min(10, "Age must be at least 10")
        .max(100, "Age must be less than 100")
        .required("Required"),
      studentClass: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingStudent) {
        updateStudent({ ...values, id: editingStudent.id });
      } else {
        addStudent(values);
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (editingStudent) {
      formik.setValues({
        name: editingStudent.name,
        age: editingStudent.age,
        studentClass: editingStudent.studentClass,
        email: editingStudent.email,
      });
    }
  }, [editingStudent]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error-message">{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.touched.age && formik.errors.age ? (
          <div className="error-message">{formik.errors.age}</div>
        ) : null}
      </div>

      <div>
        <label>Class:</label>
        <input
          type="text"
          name="studentClass"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.studentClass}
        />
        {formik.touched.studentClass && formik.errors.studentClass ? (
          <div className="error-message">{formik.errors.studentClass}</div>
        ) : null}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
      </div>

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
