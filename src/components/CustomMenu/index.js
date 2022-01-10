import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 12,
        minWidth: 120,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    Heading: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: '14px',
        color: '#595c60',
        marginBottom: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputRoot: {
        padding: "10px 14px"
    }
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const {
        heading,
        list = [],
        item, updateItem,
    } = props;

    const handleChange = (event) => {
        updateItem(event.target.value);
    };

    return (
        <div>
            <div className={classes.Heading}>
                <div>{heading}</div>
            </div>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item}
                    onChange={handleChange}
                    label="Age"
                    input={<OutlinedInput classes={{ input: classes.inputRoot }} />}
                >
                    {
                        list.map(({ name, id }) => {
                            return (
                                <MenuItem value={id}>{name}</MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}