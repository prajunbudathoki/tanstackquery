import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

// with the use of tanstack query 

interface Post {
  id: number
  title: string
  body: string
}

const FetchRQ: React.FC = () => {
  const fetchPosts = async (): Promise<Post[]> => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3")
    if (res.status === 200) {
      return res.data
    } else {
      throw new Error('Failed to fetch posts')
    }
  }

  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FetchRQ