import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';





const TodoItem = props => {
    let { id, about, message, date, deleteTodo } = props;

    const deleteItem = () => {
        deleteTodo(id);
    }

    return (
        <ListItem
            divider
        >
            <ListItemText
                primary={message}
                secondary={about + `\xa0\xa0\xa0\xa0\xa0\xa0` + date}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}


export default TodoItem;