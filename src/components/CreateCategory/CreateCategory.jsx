import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../redux/actions';
import { validate } from '../../utils/validate';
import styles from './CreateCategory.module.css'


function CreateCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const [category, setCategory] = useState({})
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    let item = e.target.name

    setErrors(validate({ ...category, [item]: e.target.value }))
    setCategory({ ...category, [item]: e.target.value })
  }

  function handleSubmit(e) {
    setLoading(true)

    setTimeout(() => {
    setLoading(false)
    }, 2000);

    e.preventDefault()
    if (Object.keys(errors).length || !Object.keys(category).length) {
      return alert('The form is not right, please check')
    }
    dispatch(createCategory(category))
    document.getElementById('createCategory').reset()
  }

  return (
  <>
  {loading ? (
     <div className='w-[500px]'>
     <div className="alert alert-success shadow-lg w-full">
       <div>
         <svg
           xmlns="http://www.w3.org/2000/svg"
           class="stroke-current flex-shrink-0 h-6 w-6"
           fill="none"
           viewBox="0 0 24 24"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="2"
             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
           />
         </svg>
         <span>
           Creating category success!!
         </span>
       </div>
     </div>
   </div>
  ):(
    <div className={styles.container}>
    <form className={styles.lilcontainer} id='createCategory' onSubmit={e => handleSubmit(e)}>
      <label className=''>Category id: </label>
      <div className="tooltip tooltip-right tooltip-warning max-w-xs p-1" data-tip="required">
        <input className='input input-bordered input-accent w-full max-w-xs' type="text" name='id' id='categoryId' onChange={e => handleChange(e)} />
      </div>
      <label className=''>Category name: </label>
      <div className="tooltip tooltip-right tooltip-warning max-w-xs p-1" data-tip="required">
        <input className='input input-bordered input-accent w-full max-w-xs' type="text" name='name' id='categoryName' onChange={e => handleChange(e)} />
      </div>
      <label className=''>Description: </label>
      <div className="tooltip tooltip-right tooltip-warning max-w-xs p-1" data-tip="required">
        <input className='input input-bordered input-accent w-full max-w-xs' type="text" name='description' id='categoryDesciption' onChange={e => handleChange(e)} />
      </div>
      <input className="btn btn-primary mb-5 mt-5" type="submit" value='Create Category' />
    </form>
    <br />
    {errors.id && <h1>{errors.id}</h1>}
    {errors.name && <h1>{errors.name}</h1>}
    {errors.description && <h1>{errors.description}</h1>}
  </div>
  )}
  </>
  )
};

export default CreateCategory;