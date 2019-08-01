import React from 'react'
import { ioTables } from '../data/tables'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default ({ name }: { name: string }) => {
    const ioTable = ioTables[name] || {}

    return (
        <Paper id="gate-info-io-table-paper">
            <Table>
                <TableHead>
                    <TableRow>
                        {ioTable.columns.map((heading, index) => {
                            return <TableCell key={index}>{heading}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ioTable.data.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                {row.map((data, index) => {
                                    return (
                                        <TableCell key={index}>
                                            {data}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}
