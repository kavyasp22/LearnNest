import axios from 'axios';
import React, { useState } from 'react';
import './UploadPdf.css'

function UploadPdf() {
  const [formData, setFormData] = useState({  
    title: '',  
    description: '',  
    category: '',  
    pdfFile: null,  
  });

  const [errors, setErrors] = useState({});  

  const handleChange = (e) => {  
    const { name, value, files } = e.target;  
    if (name === 'pdfFile') {  
      setFormData({ ...formData, [name]: files[0] });  
    } else {  
      setFormData({ ...formData, [name]: value });  
    }  
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setErrors({}); // Clear previous errors  

    // Basic validation (you might want more robust validation)  
    const validationErrors = {};  
    if (!formData.title) validationErrors.title = 'Title is required';  
    if (!formData.description) validationErrors.description = 'Description is required';  
    if (!formData.category) validationErrors.category = 'Category is required';
    if (!formData.pdfFile) validationErrors.pdfFile = 'PDF file is required';
    setErrors(validationErrors);  

    if (Object.keys(validationErrors).length > 0) {  
      return; // Don't submit if validation fails  
    }  

    try {  
      const formDataToSend = new FormData();  
      formDataToSend.append('title', formData.title);  
      formDataToSend.append('description', formData.description);  
      formDataToSend.append('category', formData.category);  
      formDataToSend.append('pdfFile', formData.pdfFile);  

      const response = await axios.post('/api/pdf/upload', formDataToSend);  
      console.log('Form data submitted successfully:', response.data);  
      // Handle success (e.g., redirect or show success message)  
    } catch (error) {  
      console.error('Error submitting form data:', error);  
      // Display a user-friendly error message  
      setErrors({ ...errors, serverError: 'Something went wrong' });  
    }  
  };

  return (
    <div className='container-up'>
      <form onSubmit={handleSubmit}>  
        <h1 className='head1'>Upload PDF</h1>

        {errors.title && <div className="error">{errors.title}</div>}
        <label htmlFor="title" >  
          Title:  
          <input  
            type="text"  
            name="title"  
            value={formData.title}  
            onChange={handleChange}  
          />  
        </label>

        {errors.description && <div className="error">{errors.description}</div>}
        <label htmlFor="description">  
          Description:  
          <input  
            type="text"  
            name="description"  
            value={formData.description}  
            onChange={handleChange}  
          />  
        </label>

        {errors.category && <div className="error">{errors.category}</div>}
        <label htmlFor="category">  
          Choose category:
          <select 
            name="category"  
            value={formData.category}  
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="engineering">Engineering</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
          </select>
        </label>

        {errors.pdfFile && <div className="error">{errors.pdfFile}</div>}
        <label htmlFor="pdfFile">
          Upload PDF:
          <input type="file" name="pdfFile" onChange={handleChange} /> 
        </label>

        {errors.serverError && <div className="error">{errors.serverError}</div>}
        <button type="submit" className='sub-vid'>Upload PDF</button>
      </form>  
    </div>
  );
}

export default UploadPdf;
