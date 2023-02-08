import { dropdownItems } from '../model'
import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { Blog, useGetBlogsQuery } from '@entities/Blog'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import {
	BlogsFilters,
	BlogsItems,
	BlogsSearch,
	BlogsSubTitle
} from '@features/Blogs/ui/StyledBlogs'
import { NavigationDropdown } from '@features/FilterDropdown'
import { useDebounce } from '@shared/hooks'
import { Button } from '@shared/ui/Button'
import { ComboBox } from '@shared/ui/Combobox'
import { IComboBoxItem } from '@shared/ui/Combobox/model/ComboBox.interface'
import { NotFound } from '@shared/ui/NotFound'
import { Search } from '@shared/ui/Search'
import { Typography } from '@shared/ui/Typography'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Blogs = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const { showModal } = useModalContext()

	// Api call
	const { data, isLoading } = useGetBlogsQuery(params)
	const isItemsEmpty = !data?.items.length && !isLoading
	const comboBoxItems: IComboBoxItem[] =
		data?.items.map(item => ({
			id: item.id,
			title: item.name
		})) || []

	// Local states
	const [searchValue, setSearchValue] = useState<string>(
		params.searchNameTerm || ''
	)
	const [selectedBlog, setSelectedBlog] = useState<IComboBoxItem>(
		comboBoxItems[0]
	)

	// Utils
	const handleBlogChange = (value: IComboBoxItem) => {
		setSelectedBlog(value)
	}

	const openNewBlogModal = () => {
		showModal(ModalsEnum.ADD_BLOG, true, {})
	}

	const changeSearchValue = useCallback((value: string) => {
		setSearchValue(value)
		setSearchTermToQuery(value)
	}, [])

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
			<Typography variant='title' as={'h1'}>
				Blogs
			</Typography>
			<ComboBox
				items={comboBoxItems}
				onChange={handleBlogChange}
				selectedItem={selectedBlog}
			/>
			<BlogsSubTitle>
				Unleash Your Creativity, Share Your Story. Join the Blogging Community
				Today!
			</BlogsSubTitle>
			<Button
				sx={{ marginBottom: '0.6rem' }}
				onClick={openNewBlogModal}
				variant={'primary'}
			>
				New Blog
			</Button>
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
			<BlogsItems>
				{isLoading && <BlogSkeleton count={3} />}
				{data?.items &&
					data.items.map(blog => <Blog key={blog.id} blog={blog} />)}
			</BlogsItems>
			{isItemsEmpty && <NotFound label={'There is no blogs yet 😔'} />}
		</>
	)
}
