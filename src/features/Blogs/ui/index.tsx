import { dropdownItems } from '../model'
import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { Blog, useGetBlogsQuery } from '@entities/Blog'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { useAuthMeQuery } from '@entities/User'
import {
	BlogsFilters,
	BlogsItems,
	BlogsSearch,
	BlogsSubTitle
} from '@features/Blogs/ui/StyledBlogs'
import { NavigationDropdown } from '@features/FilterDropdown'
import { useDebounce, useObserver } from '@shared/hooks'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { Button } from '@shared/ui/Button'
import { InvisibleElement } from '@shared/ui/InvisibleElement/ui'
import { NotFound } from '@shared/ui/NotFound'
import { Search } from '@shared/ui/Search'
import { anotherItemsExist } from '@shared/utils/anotherItemsExist'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Blogs = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const { showModal } = useModalContext()
	const breadcrumbsItems: IBreadCrumbsItem[] = useMemo(
		() => [{ title: 'Blogs', tag: 'h1' }],
		[]
	)

	// Observer
	const bottomElement = useRef<HTMLDivElement>(null)

	// Local states
	const [searchValue, setSearchValue] = useState<string>(
		params.searchNameTerm || ''
	)
	const [pageSize, setPageSize] = useState(10)

	// Api call
	const requestConfig = { ...params, pageSize }
	const { data, isLoading } = useGetBlogsQuery(requestConfig)
	const isItemsEmpty = !data?.items.length && !isLoading
	const anotherBlogsExist = anotherItemsExist(data)

	const { isSuccess: isAuth } = useAuthMeQuery()

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

	const changePageSize = useCallback(() => {
		setPageSize(prev => prev + 10)
	}, [pageSize])

	useObserver(bottomElement, changePageSize, isLoading, anotherBlogsExist)

	return (
		<>
			<BreadCrumbs items={breadcrumbsItems} />
			<BlogsSubTitle>
				Unleash Your Creativity, Share Your Story. Join the Blogging Community
				Today!
			</BlogsSubTitle>
			{isAuth && (
				<Button
					sx={{ marginBottom: '0.6rem' }}
					onClick={openNewBlogModal}
					variant={'primary'}
				>
					New Blog
				</Button>
			)}
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
				{isItemsEmpty ? (
					<NotFound label={'Blogs not found 😔'} />
				) : (
					data?.items.map(blog => <Blog key={blog.id} blog={blog} />)
				)}
				<InvisibleElement ref={bottomElement} />
			</BlogsItems>
		</>
	)
}
