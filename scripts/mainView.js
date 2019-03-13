import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';

import AddIcon from 'mdi-material-ui/plus';
import MenuIcon from 'mdi-material-ui/menu';

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import GridLayout from 'react-grid-layout';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue,
        error: red
    },
    typography: {
        useNextVariants: true,
    }
});

const styles = theme => ({
    menu: {
        position: 'absolute',
        top: theme.spacing.unit * 2,
        left: theme.spacing.unit * 2,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    },
    map: {
        override: "hidden",
        margin: "16px",
        height: "584px",
        width: "784px"
    }
});

const options = [
    "人员名单配置",
    "关于"
];

class MainWindow extends Reflux.Component {
    static defaultProps = {
        color: '#66ccff',
        theme: 'light'
    };

    state = {
        anchorEl: null
    }

    handleOpenMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ anchorEl: null });
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                {/* 悬浮按钮部分 */}
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleCloseMenu}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={index}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            <Typography variant="button">{option}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <IconButton className={classes.menu} onClick={this.handleOpenMenu}>
                    <MenuIcon />
                </IconButton>
            </MuiThemeProvider>
        );
    }
}

MainWindow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainWindow);