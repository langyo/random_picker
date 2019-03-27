import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import AddIcon from 'mdi-material-ui/plus';
import MenuIcon from 'mdi-material-ui/menu';
import InfoIcon from 'mdi-material-ui/information';
import PacManIcon from 'mdi-material-ui/pacMan';
import StopIcon from 'mdi-material-ui/stop';
import PeopleIcon from 'mdi-material-ui/accountGroup'

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#006064',
        },
        secondary: {
            main: '#006064',
        },
        error: red
    },
    typography: {
        useNextVariants: true,
    }
});

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        marginLeft: drawerWidth
    },
    menuButton: {
        marginRight: 20
    },
    button: {
        margin: 4,
        width: 150
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    progress: {
        margin: 24
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    }
});

class MainWindow extends Reflux.Component {
    static defaultProps = {
        color: '#66ccff',
        theme: 'light'
    };

    state = {
        open: false,
        rounding: false,

        aboutDialogOpen: false,
        anchorEl: null
    }

    handleDrawerOpen = () => this.setState({ open: true });
    handleDrawerClose = () => this.setState({ open: false });

    handleAboutDialogToggle = () => this.setState({ aboutDialogOpen: !this.state.aboutDialogOpen });

    handleRoundingToggle = () => this.setState({ rounding: !this.state.rounding });

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="打开侧边栏"
                                onClick={this.handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                海点
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav>
                        <Drawer
                            open={this.state.open}
                            onClose={this.handleDrawerClose}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="配置点名名单" />
                                </ListItem>
                                <ListItem button onClick={this.handleAboutDialogToggle}>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="关于" />
                                </ListItem>
                            </List>
                            <Divider />
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Grid container spacing={8}>
                            <Grid item sm />
                            <Grid item sm={1}>
                                {(!this.state.rounding) && (<Button
                                    className={classNames(classes.button)}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleRoundingToggle}
                                    size="large"
                                >
                                    <PacManIcon className={classes.extendedIcon} />
                                    开始点名
                                </Button>)}
                                {(this.state.rounding) && (<Button
                                    className={classNames(classes.button)}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleRoundingToggle}
                                    size="large"
                                >
                                    <StopIcon className={classes.extendedIcon} />
                                    停！
                                </Button>)}
                            </Grid>
                            <Grid item sm />
                        </Grid>
                        {/* 关于窗口 */}
                        <Dialog
                            open={this.state.aboutDialogOpen}
                            onClose={this.handleAboutDialogToggle}
                            scroll="paper"
                        >
                            <DialogTitle>关于</DialogTitle>
                            <DialogContent>
                                <Typography paragraph variant="p">
                                    {"这里暂时先空着.png"}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleAboutDialogToggle} color="primary">
                                    {"确定"}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

MainWindow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainWindow);