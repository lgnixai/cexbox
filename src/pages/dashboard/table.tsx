import {
	Box,
	Button,
	Card,
	Flex,
	NativeSelect,
	Pagination,
	Table,
	TextInput,
} from '@mantine/core'
import {
	ColumnFiltersState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import TitlePage from '~/components/base/title-page/title-page'
import { usersEx } from '~/constant/users'

import AdminLayout from '~/layouts/admin/admin-layout'
import { Users } from '~/types/users'

const columnHelper = createColumnHelper<Users>()
const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
	}),
	columnHelper.accessor('fullname', {
		header: () => <span>Fullname</span>,
	}),
	columnHelper.accessor('email', {
		header: () => 'Email',
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor('gender', {
		header: 'Gender',
	}),
	columnHelper.accessor('role', {
		header: 'Role',
	}),
]

function TablePage() {
	const [data] = useState(() => [...usersEx])
	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		state: {
			pagination,
			columnFilters,
		},
	})

	return (
		<AdminLayout>
			<Card>
				<TitlePage text="Active Employee" />
				<Box py={'sm'}>
					<TextInput
						label="Find by email"
						placeholder="Employee email"
						value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('email')?.setFilterValue(event.target.value)
						}
					/>
				</Box>

				<Table striped>
					<Table.Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Table.Th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</Table.Th>
								))}
							</Table.Tr>
						))}
					</Table.Thead>
					<Table.Tbody>
						{table.getRowModel().rows.map((row) => (
							<Table.Tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Table.Td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Td>
								))}
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
				<Flex gap="sm" pt={'md'} justify={'flex-end'}>
					<Button
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						First
					</Button>
					<Pagination
						total={table.getPageCount()}
						value={table.getState().pagination.pageIndex + 1}
						onChange={(page) => {
							console.log("page is", page)
							table.setPageIndex(page - 1)
						}}
					/>
					<Button
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						Last
					</Button>
					<NativeSelect
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value))
						}}
					>
						<option value={10}>10 / page</option>
						<option value={20}>20 / page</option>
						<option value={30}>30 / page</option>
					</NativeSelect>
				</Flex>
			</Card>
		</AdminLayout>
	)
}

export default TablePage
