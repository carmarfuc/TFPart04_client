import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReview } from '../../redux/actions';

function LeaveReview(productId) {
    const dispatch = useDispatch();
    const userEmail = localStorage.getItem("user")
    const navigate = useNavigate()
    const [ranking, setRanking] = useState('5')
    const [description, setDescription] = useState('')

    let productData = {
        userEmail: userEmail,
        productId: productId.productId
    }

    let handleChange = (e) => {
        if (e.target.name === 'description') {
            setDescription(e.target.value)
        } else if (e.target.name === 'ranking') {
            setRanking(e.target.value)
        }
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (description.length < 10) return alert('Your review must have at least 10 characters')
        productData = {
            ...productData,
            ranking: ranking,
            description: description,
        }
        await dispatch(createReview(productData));
        navigate('/user')
    }

    return (
        <div className="w-[400px] py-4 px-8 bg-slate-200 shadow-lg rounded-lg mt-12">
            <div className="flex justify-center md:justify-end -mt-16">
                <img className="w-20 h-20 object-cover rounded-full border-2 border-secondary" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt='asd' />
            </div>
            <div className='max-w-xs flex align-middle'>
                <form onSubmit={handleSubmit} className='mt-1'>
                    <label className='font-semibold '>{`¡${userEmail.split('@')[0]}, let the others know what do `}</label><br />
                    <label className='font-semibold '>{`you think about this course and rate it!`}</label><br />
                    <textarea placeholder="Type here" className="input input-bordered input-primary mt-2 resize-none" cols='40' rows='60' resize='none' name='description' onChange={handleChange}></textarea><br></br>
                    <div className="rating">
                        <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="1" />
                        <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="2" />
                        <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="3" defaultChecked />
                        <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="4" />
                        <input type="radio" name="ranking" className="mask mask-star-2 bg-accent" onChange={handleChange} value="5" />
                    </div>
                    <div>
                        <button type='submit' className="btn gap-2 btn-sm btn-secondary">
                            Submit review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LeaveReview