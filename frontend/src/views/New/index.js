import React, { useState, useMemo } from 'react';
import api from '../../services/api.js'
import './styles.css'

import camera from '../../assets/camera.svg'


export default function New( { history } ) {

  const [company, setCompany] = useState('')
  const [price, setPrice] = useState('')
  const [techs, setTechs] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])


  async function handleSubmit(event) {

    event.preventDefault()

    const data = new FormData()
    const user_id = localStorage.getItem('user')

    data.append('thumbnail', thumbnail)
    data.append('company', company)
    data.append('techs', techs)
    data.append('price', price)

    await api.post('/spots', data, {
      headers: {
        user_id
      }
    })

    history.push('/dashboard')
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? 'has-thumbnail' : ''}
        >
          <input type="file" onChange={event => { setThumbnail(event.target.files[0]) }} />
          <img src={camera} alt="Select img" />
        </label>

        <label htmlFor="company">COMPANY *</label>
        <input
          id="company"
          placeholder="Your awesome company"
          value={company}
          onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="techs">TECHS * <span>(comma separated)</span></label>
        <input
          id="techs"
          placeholder="Your company techs"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />

        <label htmlFor="price">DAILY * <span>(leave blank for a free daily)</span></label>
        <input
          id="price"
          placeholder="Your company daily price"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
        <button className="btn">Register</button>
      </form>
    </>
  );
}
