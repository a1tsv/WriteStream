import { SearchInput, SearchWrapper } from '@shared/ui/Search/ui/StyledSearch'
import { ChangeEvent, FC, memo } from 'react'
import { CiSearch } from 'react-icons/ci'

interface ISearchProps {
	value: string
	onChange: (searchValue: string) => void
}

export const Search: FC<ISearchProps> = memo(({ onChange, value }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		onChange(value)
	}

	return (
		<SearchWrapper>
			<CiSearch />
			<SearchInput
				placeholder='Search'
				onChange={onChangeHandler}
				value={value}
			/>
		</SearchWrapper>
	)
})
