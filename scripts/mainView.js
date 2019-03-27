const ipc = window.require('electron').ipcRenderer;
const fs = window.require('fs');

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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

import AddIcon from 'mdi-material-ui/plus';
import MenuIcon from 'mdi-material-ui/menu';
import InfoIcon from 'mdi-material-ui/information';
import PacManIcon from 'mdi-material-ui/pacMan';
import StopIcon from 'mdi-material-ui/stop';
import PeopleIcon from 'mdi-material-ui/accountGroup';
import HumanIcon from 'mdi-material-ui/humanHandsdown';
import ExpandLessIcon from 'mdi-material-ui/chevronDown';
import ExpandMoreIcon from 'mdi-material-ui/chevronRight';
import CloseIcon from 'mdi-material-ui/close';
import MoreIcon from 'mdi-material-ui/dotsHorizontal';
import FileReadIcon from 'mdi-material-ui/fileDownload';
import FileWriteIcon from 'mdi-material-ui/fileSend';

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
    flex: {
        flex: 1
    },
    appBar: {
        opacity: 0.8
    },
    menuButton: {
        marginRight: 20
    },
    button: {
        width: 150,
        marginLeft: "auto",
        marginRight: "auto"
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        opacity: 0.8
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
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    card: {
        width: 280,
        opacity: 0.8,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    },
    textField: {
        width: "90%",
        height: 500,
        marginLeft: "auto",
        marginRight: "auto"
    }
});

let randomNum = (minNum, maxNum) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

class MainWindow extends Reflux.Component {
    constructor(){
        super();

        ipc.on('read-file', this.handleReadFile);
        ipc.on('saved-file', this.handleWriteFile);

        // 读取默认配置文件 default.json
        fs.readFile('./default.json', (err, data) => {
            if (err) {
                return console.error(err);
            }
            this.setState({ groups: JSON.parse(data.toString()).list });
         });
    }

    randomTimerObject = null;

    state = {
        open: false,
        rounding: false,
        timeInterval: 100,

        aboutDialogOpen: false,
        listDialogOpen: false,
        listOpen: true,
        menuSelect: null,
        anchorEl: null,

        choosingGroup: 0,
        groupChangeName: "",
        groupChangeBody: "",
        nowSelectedLuckyGuy: "点击开始",
        groups: [
            { name: "默认小组", members: ["张三", "李四", "王五"] },
        ]
    }

    handleDrawerOpen = () => this.setState({ open: true });
    handleDrawerClose = () => this.setState({ open: false });

    handleAboutDialogToggle = () => this.setState({ aboutDialogOpen: !this.state.aboutDialogOpen });
    handleListDialogOpen = () => this.setState({ listDialogOpen: !this.state.listDialogOpen });
    handleListDialogClose = () => {
        let groups = this.state.groups;
        groups[this.state.choosingGroup].name = this.state.groupChangeName;
        groups[this.state.choosingGroup].members = this.state.groupChangeBody.split("\n");
        this.setState({
            listDialogOpen: false,
            groups: groups
        })
    }

    handleRoundingToggle = () => {
        this.setState({ rounding: !this.state.rounding }, () => {
            if (this.state.rounding) {
                this.timer = setInterval(() => {
                    let members = this.state.groups[this.state.choosingGroup].members;
                    let picked = randomNum(0, members.length - 1);
                    this.setState({ nowSelectedLuckyGuy: this.state.groups[this.state.choosingGroup].members[picked] });
                }, this.state.timeInterval);
            } else {
                clearInterval(this.timer);
            }
        });
    }
    handleListMenuToggle = (n) => () => this.setState({ menuSelect: this.state.menuSelect == null ? n : null, choosingGroup: n });
    handleListToggle = () => this.setState({ listOpen: !this.state.listOpen });
    handleGroupSelected = (n) => () => this.setState({ choosingGroup: n });
    handleGroupChangeWindow = (n) => () => {
        this.setState({
            open: false,
            menuSelect: null,
            listDialogOpen: true,
            groupChangeName: this.state.groups[n].name,
            groupChangeBody: this.state.groups[n].members.reduce((prev, next) => prev + "\n" + next)
        })
    }
    handleGroupNew = () => {
        let groups = this.state.groups;
        groups.push({ name: "新小组", members: []});
        this.setState({
            menuSelect: null,
            groups: groups,
            choosingGroup: groups.length - 1,
            listDialogOpen: true,
            groupChangeName: "",
            groupChangeBody: ""
        })
    }
    handleGroupDelete = (n) => () => {
        let groups = this.state.groups;
        groups.splice(n, 1);
        this.setState({
            menuSelect: null,
            groups: groups,
            choosingGroup: n > 0 ? n - 1 : 0
        })
    }
    handleGroupNameChange = (str) => this.setState({ groupChangeName: str });
    handleGroupListChange = (str) => this.setState({ groupChangeBody: str });
    
    handleReadFile = (e, path) => {
        console.log(path);
        fs.readFile(path[0], (err, data) => {
            if (err) {
                return console.error(err);
            }
            this.setState({ groups: JSON.parse(data.toString()).list });
         });
    }
    handleWriteFile = (e, path) => {
        console.log(path);
        fs.writeFile(path, JSON.stringify({ list: this.state.groups }), (err) => {
            if (err) {
                return console.error(err);
            }
         });
    }

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
                                <ListItem button onClick={() => ipc.send('read-file')}>
                                    <ListItemIcon>
                                        <FileReadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="导入名单" />
                                </ListItem>
                                <ListItem button onClick={() => ipc.send('write-file')}>
                                    <ListItemIcon>
                                        <FileWriteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="导出名单" />
                                </ListItem>
                                <ListItem button onClick={this.handleAboutDialogToggle}>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="关于" />
                                </ListItem>
                                <Divider />
                                {/* 小组名单 */}
                                <ListItem button onClick={this.handleListToggle}>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText inset primary="选择小组" />
                                    {this.state.listOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </ListItem>
                                <Collapse in={this.state.listOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {this.state.groups.map((n, index) => (
                                            <ListItem
                                                key={index}
                                                button
                                                className={classes.nested}
                                                selected={this.state.choosingGroup == index}
                                                onClick={this.handleGroupSelected(index)}
                                            >
                                                <ListItemIcon>
                                                    <HumanIcon />
                                                </ListItemIcon>
                                                <ListItemText inset primary={n.name} />
                                                <Menu
                                                    anchorEl={this.state.anchorEl}
                                                    open={this.state.menuSelect == index}
                                                    onClose={this.handleListMenuToggle(index)}
                                                >
                                                    <MenuItem onClick={this.handleGroupChangeWindow(index)}>修改</MenuItem>
                                                    <MenuItem disabled={this.state.groups.length <= 1} onClick={this.handleGroupDelete(index)}>删除</MenuItem>
                                                </Menu>
                                                <IconButton onClick={this.handleListMenuToggle(index)}>
                                                    <MoreIcon />
                                                </IconButton>
                                            </ListItem>
                                        ))}
                                        <ListItem button className={classes.nested} onClick={this.handleGroupNew}>
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText inset primary={"添加新的小组"} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                            <Divider />
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    {this.state.nowSelectedLuckyGuy}
                                </Typography>
                                <Typography variant="caption" gutterBottom>
                                    当前正在抽取 {this.state.groups[this.state.choosingGroup] && this.state.groups[this.state.choosingGroup].name} ，共 {this.state.groups[this.state.choosingGroup] && this.state.groups[this.state.choosingGroup].members.length} 人
                                </Typography>
                            </CardContent>
                            <CardActions>
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
                            </CardActions>
                        </Card>
                        {/* 人员配置窗口 */}
                        <Dialog
                            open={this.state.listDialogOpen}
                            onClose={this.handleListDialogOpen}
                            scroll="paper"
                            fullScreen
                        >
                            <div className={classes.toolbar} />
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton color="inherit" onClick={this.handleListDialogOpen} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" className={classes.flex}>
                                        配置点名人员名单
                                    </Typography>
                                    <Button color="inherit" onClick={this.handleListDialogClose}>
                                        保存
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <TextField
                                label="小组名"
                                defaultValue={this.state.groupChangeName}
                                className={classes.textField}
                                margin="normal"
                                onChange={e => this.handleGroupNameChange(e.target.value)}
                            />
                            <TextField
                                label="花名册"
                                placeholder="请输入名单，以换行隔开不同姓名"
                                defaultValue={this.state.groupChangeBody}
                                multiline
                                rowsMax="16"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.handleGroupListChange(e.target.value)}
                            />
                        </Dialog>
                        {/* 关于窗口 */}
                        <Dialog
                            open={this.state.aboutDialogOpen}
                            onClose={this.handleAboutDialogToggle}
                            scroll="paper"
                        >
                            <DialogTitle>关于</DialogTitle>
                            <DialogContent>
                                <Typography paragraph variant="body1">
                                    欢迎使用“海点”点名器！
                                </Typography>
                                <Typography paragraph variant="body1">
                                    有道“海纳百川，有容乃大”，本款点名器以此为寓意，希望既能起到点名的作用，又能让使用本点名器的课堂或者活动有着大海一般的希望和深度。
                                </Typography>
                                <Button variant="contained" onClick={() => shell.openExternal("https://github.com/langyo/random_picker")}>
                                    该软件的开源地址
                                </Button>
                                <Typography paragraph variant="body1">
                                    (https://github.com/langyo/random_picker)
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