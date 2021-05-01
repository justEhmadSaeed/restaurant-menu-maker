import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

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

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	paper: {
		borderRadius: 15,
	},
});

export default function MenuTable({ user, menuItems, setMenuItems }) {
	const classes = useStyles();

	const deleteItem = async (index) => {
		const result = await fetch(
			'http://localhost:8000/api/menu/delete',
			{
				method: 'DELETE',
				body: JSON.stringify({
					uid: user.uid,
					item: Object.keys(menuItems)[index],
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await result.json();
		if (!data.error) {
			const temp = { ...menuItems };
			delete temp[Object.keys(menuItems)[index]];
			console.log(temp);
			setMenuItems(temp);
		}
	};

	return (
		<TableContainer className={classes.paper} component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Item Name</StyledTableCell>
						<StyledTableCell align='center' padding='none'>
							Price ($)
						</StyledTableCell>
						<StyledTableCell align='center' padding='none'>
							Ingredients
						</StyledTableCell>
						<StyledTableCell align='center' padding='none'>
							Delete
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.values(menuItems).map((item, key) => (
						<StyledTableRow key={key}>
							<StyledTableCell component='th' scope='row'>
								{item.name}
							</StyledTableCell>
							<StyledTableCell align='center' padding='none'>
								{item.price}
							</StyledTableCell>
							<StyledTableCell align='center' padding='none'>
								{item.ingredients.length}
							</StyledTableCell>
							<StyledTableCell align='center' padding='none'>
								<IconButton onClick={() => deleteItem(key)}>
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
