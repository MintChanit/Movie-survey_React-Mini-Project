import React, { useState } from 'react';

const MovieSurvey = () => {
  // Form initial state
  const movieForm = {
    name: "",
    email: "",
    selectedMovie: "",
    opinion: ""
  };

  // States
  const [formData, setFormData] = useState(movieForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Movies list
  const movies = [
    { id: 1, title: "Avatar (2009)", director: "James Cameron" },
    { id: 2, title: "Inception (2010)", director: "Christopher Nolan" },
    { id: 3, title: "Interstellar (2014)", director: "Christopher Nolan" },
    { id: 4, title: "The Shawshank Redemption (1994)", director: "Frank Darabont" },
    { id: 5, title: "Pulp Fiction (1994)", director: "Quentin Tarantino" },
    { id: 6, title: "Parasite (2019)", director: "Bong Joon-ho" }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
        setErrors((prevErrors) => ({
            ...prevErrors,
        [name]: ""
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'โปรดใส่ชื่อของคุณ';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'โปรดใส่อีเมลของคุณ';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
      isValid = false;
    }

    if (!formData.selectedMovie) {
      tempErrors.selectedMovie = 'โปรดเลือกหนังที่ชื่นชอบ';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  // Reset form to create a new survey
  const handleReset = () => {
    setFormData(movieForm);
    setErrors({});
    setIsSubmitted(false);
  };

  const resetForm = () => {
    setFormData(movieForm);
    setErrors({});
  };

  // Content for success state
  const SuccessContent = () => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-medium text-green-800"> ✅ ส่งแบบสำรวจสำเร็จ!</h2>
      </div>
      
      <div className="mb-4 border-b pb-2">
        <div className="mb-2">
          <span className="text-gray-600">ชื่อ:</span>
          <span className="ml-2 text-gray-900">{formData.name}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-600">อีเมล:</span>
          <span className="ml-2 text-gray-900">{formData.email}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-600">หนังที่เลือก:</span>
          <span className="ml-2 text-purple-600 font-medium">{formData.selectedMovie}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <span className="text-gray-600">ความคิดเห็น:</span>
        <p className="mt-1 text-gray-900">{formData.opinion}</p>
      </div>
      
      <button 
        onClick={handleReset}
        className="w-full bg-gray-900 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-800 transition duration-200"
      > ↺ ทำแบบสำรวจใหม่
      </button>
    </div>
  );

  // Content for form state
  const FormContent = () => (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm f text-black mb-1">
          ชื่อ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="กรุณากรอกชื่อของคุณ"
          className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm  text-black mb-1">
          อีเมล <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm  text-black mb-1">
          เลือกหนังที่ชื่นชอบ <span className="text-red-500">*</span>
        </label>
        <div className={`border rounded-md p-3 ${errors.selectedMovie ? 'border-red-500' : 'border-gray-300'}`}>
          {movies.map((movie) => (
            <div key={movie.id} className="mb-5 last:mb-0">
              <label className="inline-flex items-center ">
                <input
                  type="radio"
                  name="selectedMovie"
                  value={movie.title}
                  checked={formData.selectedMovie === movie.title}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="text-sm font-medium text-black ml-3 ">
                  {movie.title}
                  <p className="text-sm font-medium text-gray-500">Director: {movie.director}</p>
                </span>
              </label>
            </div>
          ))}
        </div>
        {errors.selectedMovie && <p className="text-red-500 text-sm mt-1">{errors.selectedMovie}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="opinion" className="block text-sm text-black mb-1">
          ความคิดเห็นเกี่ยวกับหนัง
        </label>
        <textarea
          id="opinion"
          name="opinion"
          value={formData.opinion}
          onChange={handleChange}
          placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
        >
          ↺ รีเซ็ต
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 flex items-center"
        >
        ▷ ส่งแบบสำรวจ
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-purple-600 text-white p-4 rounded-t-lg flex items-center">
          <h1 className="text-2xl font-bold">🎞️ Movie Survey</h1>
        </div>
        
        {isSubmitted ? <SuccessContent /> : <FormContent />}
      </div>
    </div>
  );
};

export default MovieSurvey;