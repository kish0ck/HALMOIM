import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';


const MyInfoMember = ( data : any) => {
    return (
        <ListItem button style={{paddingLeft:'32px'}}>
            <ListItemAvatar>
                <Avatar alt={"Remy Sharp"} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary={data.data.name} />
        </ListItem>
    );
};


export default MyInfoMember;