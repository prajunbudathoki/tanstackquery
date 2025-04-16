import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const fetchPosts = async (id: string | undefined) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.data
}

export const deletePost = async (id: string | undefined) => {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res
}

const FetchCard = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()

    const { data, error, isLoading } = useQuery({
        queryKey: ['posts', id],
        queryFn: () => fetchPosts(id)
    })

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: (data,id) => {
            queryClient.setQueryData(['posts'],(cEl:any) => {
                return cEl.filter((post: any) => post.id !== id)
            })
        },
        onError: (error) => {
            console.error('Error deleting post:', error)
        },
    })

    if (isLoading) return <p>Loading....</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="section-accordion">
            <h1>Post ID Number - {id}</h1>
            <div>
                <p>ID: {data?.id}</p>
                <p>Title: {data?.title}</p>
                <p>Body: {data?.body}</p>
                <button onClick={() => mutation.mutate(id)}>Delete</button>
            </div>
        </div>
    )
}

export default FetchCard