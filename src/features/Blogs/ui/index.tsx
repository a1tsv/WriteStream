import { Blog, useGetBlogsQuery } from '@entities/Blog'
import { BlogsFilters } from '@features/Blogs/ui/StyledBlogs'
import { Dropdown } from '@shared/ui/Dropdown'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { Search } from '@shared/ui/Search'
import { Typography } from '@shared/ui/Typography'
import { useState } from 'react'

export const Blogs = () => {
	// Api call
	const { data, isLoading, error } = useGetBlogsQuery({})

	// Local states
	const [searchValue, setSearchValue] = useState<string>('')
	const [selectedItem, setSelectedItem] = useState<string>('')

	// Utils
	const changeSearchValue = (value: string) => {
		setSearchValue(value)
	}

	const handleSelectedChange = (value: string) => {
		setSelectedItem(value)
	}

	const dropdownItems: IDropDownItem[] = [
		{
			title: 'Item 1',
			value: 'item1'
		},
		{
			title: 'Item 2',
			value: 'item2'
		},
		{
			title: 'Item 3',
			value: 'item3'
		}
	]

	return (
		<>
			<Typography variant='title'>Blogs</Typography>
			<BlogsFilters>
				<Search value={searchValue} onChange={changeSearchValue} />
				<Dropdown
					onChangeCb={handleSelectedChange}
					button={'Dropdown'}
					items={dropdownItems}
					selected={selectedItem}
				/>
			</BlogsFilters>
			<div>
				{data?.items &&
					data.items.map(blog => <Blog key={blog.id} blog={blog} />)}
			</div>
		</>
	)
}
