import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateCategorie } from '../../redux/actions';
import { validate } from '../../utils/validate';
import styles from './CreateCategory.module.css'


export default function ModifyCategory() {
  const {idCategori} = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({})
  const [errors, setErrors] = useState({});



  function handleChange(e) {
    let item = e.target.name

    setErrors(validate({...category, [item]:e.target.value }))
    setCategory({...category, [item]:e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(Object.keys(errors).length || !Object.keys(category).length) {
      return alert('The form is not right, please check')
    }
    
    dispatch(updateCategorie(idCategori,category))
    document.getElementById('Update').reset()
  }

  return (
      <div className={styles.container}>
        <form className={styles.lilcontainer} id={idCategori} onSubmit={e => handleSubmit(e)}>
          <label>id: {idCategori}</label>
          <label>Category name: </label>
          <input className={styles.dalebro} type="text" name='name' id='categoryName' onChange={e => handleChange(e)}/>
          <label>Description: </label>
          <input className={styles.dalebro} type="text" name='description' id='categoryDesciption' onChange={e => handleChange(e)}/>
          <input className={styles.create} type="submit" value='Update'/>
        </form>
        <br />
        {errors.id && <h1>{errors.id}</h1>}
        {errors.name && <h1>{errors.name}</h1>}
        {errors.description && <h1>{errors.description}</h1>}
      </div>
  );
};

