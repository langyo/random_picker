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

import Grid from '@material-ui/core/Grid';
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
    content: {
        display: "relative",
        padding: theme.spacing.unit * 3
    },
    menu: {
        position: 'absolute',
        top: theme.spacing.unit * 2,
        left: theme.spacing.unit * 2,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: "absolute",
        position: "fixed",
        marginLeft: "auto",
        marginRight: "auto",
        width: 800
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
            <div className={classes.content}>
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
                    {/* 界面部分 */}
                    <Grid
                        container
                        spacing={24}
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <Grid item xs/>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Typography paragraph variant="h5">
                                    正在建设中，敬请期待！
                            </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs/>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}

MainWindow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainWindow);