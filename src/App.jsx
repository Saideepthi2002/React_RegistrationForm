import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const [hobbielist,sethobbielist]=useState([])
  const [currentHobbie,setCurrentHobbie]=useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // tracking the current hobbie
  function trackcurrenthobbie(event){
    setCurrentHobbie(event.target.value)
  }

  // adding hobbies dynamically to list
  function addhobbies(){
    if(currentHobbie.trim()!==''){
      sethobbielist([...hobbielist,currentHobbie])
      setCurrentHobbie('')
    }
    else{
      alert('Please enter a hobby')
    }
  }

  function onsubmit(data) {
    console.log("Registration details", data);
    console.log(hobbielist)
    reset()
  }
  // .Registration

  return (
    <>
      <h1 className="Reg">Registration Form</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label>
            <strong>Name:</strong>
          </label>
          <input
            {...register("name", {
              required: true,
              minLength: { value: 3, message: "Min length atleast 3" },
              maxLength: { value: 6, message: "Max length atmost 6" },
            })}
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>
        <br></br>
        <div>
          <label>
            <strong>Email:</strong>
          </label>
          <input
          {...register('email',{required:"email is required",pattern:{value: /^\S+@\S+\.\S+$/,message:"Entered value does not match email format"}})}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>
        <br></br>
        <div>
          <label>
            <strong>Age:</strong>
          </label>
          <input {...register('age',{required:true, min: { value: 11, message: "Age must be greater that 10" },})}/>
          {errors.age && <p className="error-msg">{errors.age.message}</p>}
        </div>
        <br></br>
        <div>
          <label>
            <strong>Hobbies:</strong>
          </label>
          <input type="text" onChange={trackcurrenthobbie}  value={currentHobbie}/>
          <button type="button" onClick={addhobbies}>Add Hobbie</button>
        </div>
        {/* <ul>
          {hobbielist.map((ele,index)=>(<li key={index}>{ele}</li>))}
        </ul> */}
        <div className="hobby-list">
          {hobbielist.map((ele,index)=>(<span key={index} className="hobby-item">{ele},</span>))}
        </div>
        <br></br>
        <input type="submit" ></input>
      </form>
    </>
  );
}

export default App;
