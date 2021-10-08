import React from 'react'
import { Route, Routes } from 'react-router'
import { UserContext } from '../../UserContext'
import Feed from '../Feed/Feed'
import ProtectedRoute from '../Helper/ProtectedRoute'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import NotFound from '../NotFound';
import Head from '../Helper/Head'

const User = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className='container'>
      <Head title='Minha conta' />
      <UserHeader />
      <Routes>
        <Route path='/' element={<Feed user={data.id} />} />
        <Route path='postar' element={<UserPhotoPost />} />
        <Route path='estatisticas' element={<UserStats />} />
        <ProtectedRoute path='*' element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default User
