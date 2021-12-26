import React from 'react';
import { useMemo } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useSortBy,
	useExpanded,
} from 'react-table';
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';

interface AppProps {
	cols: number; //delete this later
}
interface ColumnDetails {
	[key: string]: string;
}

export default function SimpleStripedTable(props: AppProps) {
	const data = useMemo<ColumnDetails[]>(
		() => [
			{
				col1: 'Hello',
				col2: 'World',
				col3: 'Hello',
				col4: 'World',
				col5: 'Hello',
			},
			{
				col1: 'qello',
				col2: 'Wsorld',
				col3: 'aello',
				col4: 'borld',
				col5: 'cello',
			},
			{
				col1: 'Hello',
				col2: 'World',
				col3: 'Hello',
				col4: 'World',
				col5: 'Hello',
			},
			{
				col1: 'Hello',
				col2: 'World',
				col3: 'Hello',
				col4: 'World',
				col5: 'Hello',
			},
			{
				col1: 'Hello',
				col2: 'World',
				col3: 'Hello',
				col4: 'World',
				col5: 'Hello',
			},
			{
				col1: 'Hello',
				col2: 'World',
				col3: 'Hello',
				col4: 'World',
				col5: 'Hello',
			},
		],
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: 'Column 1',
				accessor: 'col1', // accessor is the "key" in the data
			},
			{
				Header: 'Column 2',
				accessor: 'col2',
			},
			{
				Header: 'Column 3',
				accessor: 'col3',
			},
			{
				Header: 'Column 4',
				accessor: 'col4',
			},
			{
				Header: 'Column 5',
				accessor: 'col5',
			},
		],
		[]
	);
	function Table({ columns: userColumns, data, renderRowSubComponent }) {
		const {
			getTableProps,
			getTableBodyProps,
			headerGroups,
			rows,
			prepareRow,
			visibleColumns,
			state: { expanded },
		} = useTable(
			{
				columns: userColumns,
				data,
			},
			useExpanded,
			useSortBy
		);

		const firstPageRows = rows.slice(0, 20);

		return (
			<div className="flex flex-col border-2 border-coffee-light rounded-lg">
				<div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden rounded-md">
							<pre>
								<code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
							</pre>
							<table
								{...getTableProps()}
								className="min-w-full divide-y divide-gray-200"
							>
								<thead className="bg-coffee-light">
									{headerGroups.map((headerGroup, j) => (
										<tr key="{j}" {...headerGroup.getHeaderProps}>
											{headerGroup.headers.map((column, i) => (
												// Apply the header cell props
												<th
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
													key="{i}"
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-cream-light uppercase tracking-wider"
												>
													{
														// Render the header
														column.render('Header')
													}
													<span>
														{column.isSorted ? (
															column.isSortedDesc ? (
																<SortDescendingIcon
																	className="inline ml-2 h-4 w-4 text-accent-light"
																	aria-hidden="true"
																/>
															) : (
																<SortAscendingIcon
																	className="ml-2 inline h-4 w-4 text-accent-light"
																	aria-hidden="true"
																/>
															)
														) : (
															<SortAscendingIcon
																className="ml-2 inline h-4 w-4 text-cream-light"
																aria-hidden="true"
															/>
														)}
													</span>
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody
									{...getTableBodyProps}
									className="bg-cream-light divide-y divide-gray-200"
								>
									{
										// Loop over the table rows
										rows.map((row, i) => {
											// Prepare the row for display
											prepareRow(row);
											return (
												<React.Fragment {...row.getRowProps()}>
													// Apply the row props
													<tr {...row.getRowProps()}>
														{
															// Loop over the rows cells
															row.cells.map((cell) => {
																// Apply the cell props
																return (
																	<td
																		{...cell.getCellProps()}
																		className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
																	>
																		{
																			// Render the cell contents
																			cell.render('Cell')
																		}
																	</td>
																);
															})
														}
													</tr>
													{row.isExpanded ? (
														<tr>
															<td colSpan={visibleColumns.length}>
																{/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
																{renderRowSubComponent({ row })}
															</td>
														</tr>
													) : null}
												</React.Fragment>
											);
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
