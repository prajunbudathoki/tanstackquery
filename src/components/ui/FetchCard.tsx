import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const fetchPosts = async (id: any) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.data
}

const FetchCard = () => {
    const { id } = useParams()
    const { data, error, isPending } = useQuery({
        queryKey: ['posts', id],
        queryFn: () => fetchPosts(id)
    })

    if (isPending) return <p>Loading....</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className="section-accordion">
            <h1>Post ID Number - {id}</h1>
            <div>
                <p>ID: {data.id}</p>
                <p>Title: {data.title}</p>
                <p>Body: {data.body}</p>
            </div>
        </div>
    )
}

export default FetchCard