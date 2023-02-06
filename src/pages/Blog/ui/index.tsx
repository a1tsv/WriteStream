import { Blog } from '@entities/Blog'
import { useGetBlogQuery } from '@entities/Blog/model'
import { useParams } from 'react-router'

export const BlogPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data, isLoading, error } = useGetBlogQuery(id as string)
	return <div>{data && <Blog blog={data} />}</div>
}
