import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePermission } from '../../redux/actions';
import styles from './AdminSite.module.css';

export default function Users() {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  let URL= 'https://tf-henry-04-02.herokuapp.com';

  async function deletePost(emailUser) {
    await axios.delete(`${URL}/user/delete/${emailUser}`);
    alert('Delete successful');
    dispatch(getUser());
  }

  console.log(users)

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);


  const getUser = () => {
    return function (dispatch) {
      return axios.get(`${URL}/user`)
        .then(resp => dispatch({ type: 'GET_USERS', payload: resp.data }))
        .catch(error => console.log('Action error in getProducts: ', error))
    }
  }

  function handlePermission(e) {
    console.log(e)
    if (e.target.name === 'Admin') {
      dispatch(changePermission({ email: e.target.id, usertype: 'User' }))
      setTimeout(() => {
        dispatch(getUser())
      }, 100);
      dispatch(getUser())
    } else {
      dispatch(changePermission({ email: e.target.id, usertype: 'Admin' }))
      setTimeout(() => {
        dispatch(getUser())
      }, 100);
      dispatch(getUser())
    }
  }

  return (
    <div>
      <div className="overflow-x-auto w-full z-50">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>User type</th>
              <th>Permissions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length ?
              users.map(u => {
                console.log(u.email)
                return <tr>

                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{u.nickName}</div>
                        <div className="text-sm opacity-50">{u.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {u.usertype}
                  </td>
                  <th>
                  <button className="btn" id={u.email} name={u.usertype} onClick={e => handlePermission(e)}>Change to {u.usertype === 'Admin' ? 'User' : 'Admin'}</button>
                  </th>
                  <th>
                    <button onClick={() => deletePost(u.email)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 btn-ghost "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </th>
                </tr>
              })
              : null
            }
          </tbody>
          {/* <!-- foot --> */}
        </table>
      </div>
      <div>
      </div>
    </div>
  );
};