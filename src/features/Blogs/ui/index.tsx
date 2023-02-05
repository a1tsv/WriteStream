import { Blog, useGetBlogsQuery } from '@entities/Blog'
import { BlogsFilters } from '@features/Blogs/ui/StyledBlogs'
import { Search } from '@shared/ui/Search'
import { Typography } from '@shared/ui/Typography'
import { useState } from 'react'

export const Blogs = () => {
	const { data, isLoading, error } = useGetBlogsQuery({})
	const [searchValue, setSearchValue] = useState<string>('')

	const changeSearchValue = (value: string) => {
		setSearchValue(value)
	}

	return (
		<>
			<Typography variant='title'>Blogs</Typography>
			<BlogsFilters>
				<Search value={searchValue} onChange={changeSearchValue} />
			</BlogsFilters>
			<div>
				{data?.items &&
					data.items.map(blog => <Blog key={blog.id} blog={blog} />)}
			</div>
		</>
	)
}
