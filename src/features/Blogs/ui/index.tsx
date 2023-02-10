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
import { BreadCrumbs } from '@shared/ui/Breadcrumbs/ui'
import { Button } from '@shared/ui/Button'
import { NotFound } from '@shared/ui/NotFound'
import { Search } from '@shared/ui/Search'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Blogs = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const { showModal } = useModalContext()
	const breadcrumbsItems = useMemo(() => [{ title: 'Blogs', tag: 'h1' }], [])

	// Api call
	const { data, isLoading } = useGetBlogsQuery(params)
	const isItemsEmpty = !data?.items.length && !isLoading

	// Local states
	const [searchValue, setSearchValue] = useState<string>(
		params.searchNameTerm || ''
	)

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
			{/* <Typography variant='title' as={'h1'}>
				Blogs
			</Typography> */}
			<BreadCrumbs items={breadcrumbsItems} />
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
