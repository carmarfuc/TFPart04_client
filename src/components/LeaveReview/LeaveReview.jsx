import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReview } from '../../redux/actions';

function LeaveReview(productId) {
    const dispatch = useDispatch();
    const userEmail = localStorage.getItem("user")
    const navigate = useNavigate()

    let productData = {}

    let handleChange = (e) => {
        productData = {
            ...productData,
            [e.target.name]: e.target.value
        }
    }
    console.log('Prod data: ',productData)
    let handleSubmit = async (e) => {
        e.preventDefault();
        productData = {
            ...productData,
            userEmail: userEmail,
            productId: productId
        }
        alert('PERO QUE RAYOS MANDO', productData)
        await dispatch(createReview(productData));
        navigate('/user')
    }

    return (
        <div>
            <div>
                <div className="max-w-md py-4 px-8 bg-slate-200 shadow-lg rounded-lg my-20">
                    <div className="flex justify-center md:justify-end -mt-16">
                        <img className="w-20 h-20 object-cover rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt='asd' />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className='mt-1'>
                            <label className='font-semibold'>{`¡${userEmail.split('@')[0]}, let the others know what do you think about the course and rate it!`}</label><br />
                            <textarea placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs mt-2" name='description' onChange={handleChange}></textarea>
                            <div className="rating">
                                <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="1" />
                                <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="2" />
                                <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="3" defaultChecked />
                                <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="4" />
                                <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="5" />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type='submit' className="btn gap-2 btn-sm btn-secondary">
                                    Submit review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveReview