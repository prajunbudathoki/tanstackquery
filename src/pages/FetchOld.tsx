import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Without the use of tanstack query

const FetchOld = () => {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(true)

  const fetchPosts = async() => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3")
    if(res) {
      setPosts(res.data)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  },[])

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default FetchOld