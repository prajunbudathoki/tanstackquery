import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

const fetchUsers = async ({ pageParam = 1 }) => {
    const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
    return res.data
}

const InfinitePage = () => {
    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage, allPages)
            return lastPage.length === 10 ? allPages.length + 1 : undefined
        }
    })
    console.log(data)

    const handleScroll = () => {
        const btm = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1

        if (btm && hasNextPage) {
            fetchNextPage()
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })
    return (
        <div>
            <h1>Infinite scroll using tanstack query</h1>
            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user: any) => (
                        <li
                            key={user.id}
                            style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                            <p>{user.login}</p>
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                width={50}
                                height={50}
                            />
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default InfinitePage