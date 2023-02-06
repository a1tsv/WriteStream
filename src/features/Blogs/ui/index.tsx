import { Blog, useGetBlogsQuery } from '@entities/Blog'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { dropdownItems } from '@features/Blogs/model'
import { BlogsFilters, BlogsSearch } from '@features/Blogs/ui/StyledBlogs'
import { useDebounce } from '@shared/hooks'
import { Dropdown } from '@shared/ui/Dropdown'
import { Search } from '@shared/ui/Search'
import { Typography } from '@shared/ui/Typography'
import { getOptionTitleByValue } from '@shared/utils/getOptionTitleByValue'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Blogs = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams)

	// Api call
	const { data, isLoading, error } = useGetBlogsQuery(params)

	// Local states
	const [searchValue, setSearchValue] = useState<string>(
		params.searchNameTerm || ''
	)
	const [selectedItem, setSelectedItem] = useState<string>(
		getOptionTitleByValue(dropdownItems, params.sortDirection) ||
			dropdownItems[0].title
	)

	// Utils
	const changeSearchValue = (value: string) => {
		console.log('changeSearchValue', value)
		setSearchValue(value)
		setSearchTermToQuery(value)
	}

	const setSearchTermToQuery = useDebounce((value: string) => {
		console.log('setSearchTermToQuery', value)
		if (!value) {
			searchParams.delete('searchNameTerm')
			setSearchParams(searchParams)
			return
		}
		setSearchParams({ ...params, searchNameTerm: value })
	}, 500)

	const handleSelectedChange = (value: string) => {
		setSelectedItem(getOptionTitleByValue(dropdownItems, value) as string)
		setSearchParams({ ...params, sortDirection: value })
	}

	return (
		<>
			<Typography variant='title' sx={{ marginBottom: '0.6rem' }}>
				Blogs
			</Typography>
			<BlogsFilters>
				<BlogsSearch>
					<Search value={searchValue} onChange={changeSearchValue} />
				</BlogsSearch>
				<Dropdown
					onChangeCb={handleSelectedChange}
					button={'Dropdown'}
					items={dropdownItems}
					selected={selectedItem}
					sx={{ width: '200px' }}
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
