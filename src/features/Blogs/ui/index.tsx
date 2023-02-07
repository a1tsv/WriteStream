import { Blog, useGetBlogsQuery } from '@entities/Blog'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { dropdownItems } from '@features/Blogs/model'
import { BlogsFilters, BlogsSearch } from '@features/Blogs/ui/StyledBlogs'
import { NavigationDropdown } from '@features/FilterDropdown'
import { useDebounce } from '@shared/hooks'
import { Search } from '@shared/ui/Search'
import { Typography } from '@shared/ui/Typography'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Blogs = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams)

	// Api call
	const { data, isLoading } = useGetBlogsQuery(params)

	// Local states
	const [searchValue, setSearchValue] = useState<string>(
		params.searchNameTerm || ''
	)

	// Utils
	const changeSearchValue = (value: string) => {
		setSearchValue(value)
		setSearchTermToQuery(value)
	}

	const setSearchTermToQuery = useDebounce((value: string) => {
		if (!value) {
			searchParams.delete('searchNameTerm')
			setSearchParams(searchParams)
			return
		}
		setSearchParams({ ...params, searchNameTerm: value })
	}, 500)

	return (
		<>
			<Typography variant='title' sx={{ marginBottom: '0.6rem' }}>
				Blogs
			</Typography>
			<BlogsFilters>
				<BlogsSearch>
					<Search value={searchValue} onChange={changeSearchValue} />
				</BlogsSearch>
				<NavigationDropdown
					items={dropdownItems}
					params={params}
					setSearchParams={setSearchParams}
				/>
			</BlogsFilters>
			<div>
				{isLoading && <BlogSkeleton count={3} />}
				{data?.items &&
					data.items.map(blog => <Blog key={blog.id} blog={blog} />)}
			</div>
		</>
	)
}
