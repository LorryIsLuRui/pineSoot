import React, { useState, useRef } from 'react';
import './header.scss';
import { Button, Badge, Avatar, Popper, Paper, Grow, MenuItem, MenuList, ClickAwayListener } from "@material-ui/core";
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors"
const BadgeStyles = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    })
)(Badge);
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(green[900]),
            backgroundColor: green[300],
        },
    }),
);
const HeaderCom: React.FC = () => {
    const avatarClasses = useStyles();
    const [menuStatus, setMenu] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const showMenu = () => {
        setMenu(!menuStatus);
    }
    const handleMenu = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setMenu(false);
    }
    return <div className="header-com-wrap" >
        <div className="logo">logo</div>
        <div className="header-content">墨读</div>
        <Button ref={anchorRef}
                aria-controls={menuStatus ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={showMenu}
        >
            <BadgeStyles
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar className={avatarClasses.orange} alt="Remy Sharp">L</Avatar>
            </BadgeStyles>
        </Button>
        <Popper open={menuStatus} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        {/* <ClickAwayListener onClickAway={handleClose}> */}
                        <MenuList autoFocusItem={menuStatus} id="menu-list-grow">
                            <MenuItem onClick={handleMenu}>个人中心</MenuItem>
                            <MenuItem onClick={handleMenu}>设置</MenuItem>
                            <MenuItem onClick={handleMenu}>退出</MenuItem>
                        </MenuList>
                        {/* </ClickAwayListener> */}
                    </Paper>
                </Grow>
            )}
        </Popper>
    </div>
}
export default HeaderCom;