import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../redux/actions';

// import styles from './Details.module.css'

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const product = useSelector(state => state.productDet)
  let imageName;

  useEffect(() => {
    async function newId(id) {
      setLoading(true)
      await dispatch(getProductById(id))

      //This sets in the store the product i want to see the details
      setLoading(false)
    }
    console.log(product)
    if (id) newId(id)
  }, [product?.image])

  imageName = product?.image?.includes('product') ?
    '../../img_products/' + product?.image + '.jpg' :
    `https://res.cloudinary.com/da42wdmjv/image/upload/v1654727380/${product?.image}`

  if (!id) {
    return <p>How did you get here? Please send review! Anyways, come again with a recipe to get details!</p>
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  let starsAverage = product.reviews ? product.reviews.map(r => {
    return r.ranking
  }) : []

  let starsAverageNumber = Math.ceil(starsAverage.reduce((a, b) => a + b, 0) / starsAverage.length)

  let courseAverage;

  isNaN(!starsAverageNumber) ? courseAverage = starsAverageNumber : courseAverage = 3

  return (
    <div className="grid justify-items-center">
      <div className="grid grid-cols-2 justify-items-center rounded w-2/3 m-4 p-4  border bg-white">
        <div className="w-2/3">
          <div className="grid pt-2 justify-items-center">
            <h1 className="text-xl text-orange-700 font-bold">{product.name}</h1>
          </div>
          <div className="grid justify-items-start w-full bg-gray-100 p-4 border shadow-md">
            <div className="text-md mb-2 text-orange-700 font-bold">Description:</div>
            <div className="pt-1">
              <div className="mb-2 text-sm">
                {product.description}
              </div>
            </div>

            <div className="text-md mb-2 text-orange-700 font-bold">Price:</div>
            <div className="pt-1">
              <div className="mb-2 text-sm">
                ${product.price} USD
              </div>
            </div>

            <div className="text-md mb-2 text-orange-700 font-bold">Ranking:</div>
            <div className="pt-1">
              <div className="mb-2 text-sm">
                {product.ranking}
              </div>
            </div>

            <div className="text-md mb-2 text-orange-700 font-bold">Stock:</div>
            <div className="pt-1">
              <div className="mb-2 text-sm">
                {product.stock} places
              </div>
            </div>

            <div className="text-md mb-2 text-orange-700 font-bold">Categories:</div>
            <div className="pt-1">
              <div className="mb-2 text-sm">{product.categories + " "}
              </div>
            </div>
          </div>
        <div className='mt-8'>
          <img className="grid shadow-lg rounded-lg " src={imageName} alt={product.name} />
          <br /><br />
        </div>
        </div>

        <div className="pt-1">
          <div className="rating rating-sm">
            {
              courseAverage === 1 ? <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
                :
                <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

            {courseAverage === 2 ? <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
              :
              <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

            {courseAverage === 3 ? <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
              :
              <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

            {courseAverage === 4 ? <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
              :
              <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

            {courseAverage === 5 ? <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
              :
              <input type="radio" name={`rating-6-Product`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}
          </div>
          <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">User reviews:</div>
          <div className="mb-2 text-sm">
            {product.reviews ? product.reviews.map((r, i) => {
              return (
                <div key={i}>
                  <div className="w-[400px] py-4 px-8 bg-slate-200 shadow-lg rounded-lg my-20">
                    <div className="flex justify-center md:justify-end -mt-16">
                      <img className="w-20 h-20 object-cover rounded-full border-2 border-amber-900" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt='asd' />
                    </div>
                    <div>
                      <div className="rating rating-sm">
                        {r.ranking === 1 ? <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
                          :
                          <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

                        {r.ranking === 2 ? <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
                          :
                          <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

                        {r.ranking === 3 ? <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
                          :
                          <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

                        {r.ranking === 4 ? <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
                          :
                          <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}

                        {r.ranking === 5 ? <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} checked disabled />
                          :
                          <input type="radio" name={`rating-6${i}`} className="mask mask-star-2 bg-orange-400" style={{ cursor: 'default' }} disabled />}
                      </div>

                      <p className="mt-2 text-gray-600 font-semibold">{r.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <span href="#" className="text-xl font-medium text-indigo-500">{r.nickName}</span>
                    </div>
                  </div>
                </div>
              )
            }) : <p>No reviews yet!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;