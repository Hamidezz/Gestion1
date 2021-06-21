import React from 'react'
import Message from './Message'
const Home = ({ children }) => {
  return (
    <main>
      <h3>
        <Message />
      </h3>
      {children}
    </main>
  )
}

export default Home
