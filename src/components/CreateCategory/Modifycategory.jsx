import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateCategorie } from '../../redux/actions';
import styles from './CreateCategory.module.css'


export default function ModifyCategory() {
  const navigate = useNavigate();
  const { idCategori } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({})
  const [errors, setErrors] = useState({});


  const validate = (input) => { //create category validation
    let errors = {}

    if (!input.name) errors.name = 'Must have a name'
    let pattern = /^[a-zA-Z0-9 ]*$/
    if (!pattern.test(input.name)) errors.name = 'Cannot contain special characters'

    if (!input.description) errors.description = 'Must have a description'

    return errors
  }

  function handleChange(e) {
    let item = e.target.name

    setErrors(validate({ ...category, [item]: e.target.value }))
    setCategory({ ...category, [item]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (Object.keys(errors).length || !Object.keys(category).length) {
      return alert('The form is not right, please check')
    }

    dispatch(updateCategorie(idCategori, category))
    document.getElementById('Update').reset()
    navigate("/Admin")
  }
  return (
      <div className={styles.container}>
        <form className={styles.lilcontainer} id={idCategori} onSubmit={e => handleSubmit(e)}>
          <label className='font-semibold text-orange-700'>id: {idCategori}</label>
          <label className='font-semibold text-orange-700'>Category name: </label>
          <div className="tooltip tooltip-right tooltip-warning max-w-xs p-1" data-tip="required">
          <input className='input input-bordered input-accent w-full max-w-xs' type="text" name='name' id='categoryName' onChange={e => handleChange(e)}/>
          </div>
          <label className='font-semibold text-orange-700'>Description: </label>
          <div className="tooltip tooltip-right tooltip-warning max-w-xs p-1" data-tip="required">
          <input className='input input-bordered input-accent w-full max-w-xs' type="text" name='description' id='categoryDesciption' onChange={e => handleChange(e)}/>
          </div>
          <input className="btn btn-primary mb-5 mt-5" type="submit" value='Update'/>
        </form>
        <br />
        {errors.id && <h1>{errors.id}</h1>}
        {errors.name && <h1>{errors.name}</h1>}
        {errors.description && <h1>{errors.description}</h1>}
      </div>
  );
};

