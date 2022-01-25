import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    select: {
        height: '21px',
        padding: '10.5px 16.5px 10.5px 17px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Poppins',
        fontSize: '16px',
        color: '#050505',
    },
    Heading: {
        fontFamily: 'Poppins',
        fontSize: '18px',
        color: '#808080',
        marginBottom: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputRoot: {
    },
    container: {
        marginBottom: '24px',
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
        <div className={classes.container}>
            <div className={classes.Heading}>
                <div>{heading}</div>
            </div>
            {/* <FormControl variant="outlined" className={classes.formControl}> */}
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item}
                    onChange={handleChange}
                    label="Age"
                    classes={{
                        root: classes.select,
                    }}
                    style={{
                        borderRadius: '12px',
                        width: '100%',
                        border: '1px solid #d3d5d9',
                    }}
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
            {/* </FormControl> */}
        </div>
    );
}