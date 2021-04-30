import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: 'teal',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData({ name, email, score }) {
	return { name, email, score };
}

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	paper: {
		borderRadius: 15,
	},
});

export default function MenuTable({ user }) {
	const classes = useStyles();
	const [rows, setRows] = useState([{ name: 'Demo', price: 30 }]);
	return (
		<TableContainer className={classes.paper} component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Item Name</StyledTableCell>
						<StyledTableCell align='center' padding='none'>
							Price
						</StyledTableCell>
						<StyledTableCell align='center' padding='none'>
							Edit
						</StyledTableCell>
						<StyledTableCell align='center' padding='none'>
							Delete
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.name}>
							<StyledTableCell component='th' scope='row'>
								{row.name}
							</StyledTableCell>
							<StyledTableCell align='center' padding='none'>
								{row.price}
							</StyledTableCell>
							<StyledTableCell align='center' padding='none'>
								<IconButton>
									<Edit />
								</IconButton>
							</StyledTableCell>
							<StyledTableCell align='center' padding='none'>
								<IconButton>
									<Delete />
								</IconButton>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
