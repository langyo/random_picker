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
        margin: 4
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    paper: {
        padding: 4,
        margin: 4
    },
    center: {
        width: 240,
        marginLeft: "auto",
        marginRight: "auto"
    },
    progress: {
        margin: 24
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
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="打开侧边栏"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                SPU
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav>
                        <Drawer
                            open={this.state.open}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            <List>
                                <ListItem button onClick={this.handleAboutDialogToggle}>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="关于" />
                                </ListItem>
                                <ListItem button disabled>
                                    <ListItemIcon>
                                        <ColorIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="更换主题" />
                                </ListItem>
                                <ListItem button onClick={this.handleClearCache}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="清除缓存" />
                                </ListItem>
                            </List>
                            <Divider />
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Grid container spacing={8}>
                            <Grid item lg md />
                            <Grid item lg={4} md={8} xs={12}>
                                <Paper className={classes.paper}>
                                    <div className={classes.center}>
                                        <Button
                                            className={classes.button}
                                            onClick={this.handleFromMenuOpen}
                                        >
                                            {versions[this.state.fromVersion]}
                                        </Button>
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="primary"
                                            onClick={this.handleBeginTransform}
                                        >
                                            <TransferIcon />
                                        </Button>
                                        <Button
                                            className={classes.button}
                                            onClick={this.handleToMenuOpen}
                                        >
                                            {versions[this.state.toVersion]}
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item lg md />
                        </Grid>
                        <Grid container spacing={8}>
                            <Gird sm />
                            <Grid item sm={6}>
                                <TextField
                                    id="before"
                                    multiline
                                    label="欲转换的命令/函数"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChangeInputCommand}
                                    value={this.state.inputCommands}
                                />
                            </Grid>
                            <Gird sm />
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