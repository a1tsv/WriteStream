import {
	ITableSizes,
	TableBody,
	TableHeader,
	TableLine,
	TableWrapper
} from '@shared/ui/Table'

export default {
	title: 'Shared/Table'
}

export const Table = () => {
	const tableConfig: ITableSizes = {
		columns: 3,
		maxWidth: '1fr',
		minWidth: '300px'
	}

	return (
		<TableWrapper>
			<TableHeader {...tableConfig}>
				<div>Column 1</div>
				<div>Column 1</div>
				<div>Column 1</div>
			</TableHeader>
			<TableBody>
				<TableLine {...tableConfig}>
					<div>Line 2</div>
					<div>Line 2</div>
					<div>Line 2</div>
				</TableLine>
				<TableLine {...tableConfig}>
					<div>Line 1</div>
					<div>Line 2</div>
					<div>Line 3</div>
				</TableLine>
				<TableLine {...tableConfig}>
					<div>Line 3</div>
					<div>Line 3</div>
					<div>Line 3</div>
				</TableLine>
			</TableBody>
		</TableWrapper>
	)
}
