import React from "react";
import {
  Icon,
  IconButton,
  MenuItem,
  Avatar,
  useMediaQuery,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { MatxMenu, MatxSearchBox } from "matx";
import NotificationBar from "../SharedCompoents/NotificationBar";
import { Link } from "react-router-dom";
import ShoppingCart from "../SharedCompoents/ShoppingCart";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { merge } from "lodash";
import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbar: {
    top: 0,
    zIndex: 96,
    transition: "all 0.3s ease",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))",

    "& .topbar-hold": {
      backgroundColor: palette.primary.main,
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    "& .fixed": {
      boxShadow: theme.shadows[8],
      height: 64,
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { settings } = useSelector(({ layout }) => layout);

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fixed = settings?.layout1Settings?.topbar?.fixed;

  const updateSidebarMode = (sidebarSettings) => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              ...sidebarSettings,
            },
          },
        })
      )
    );
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }

    updateSidebarMode({ mode });
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={classes.topbar}>
      <div className={clsx({ "topbar-hold": true, fixed: fixed })}>
        <div className="flex justify-between items-center h-full">
          <div className="flex">
            <IconButton onClick={handleSidebarToggle} className="hide-on-pc">
              <Icon>menu</Icon>
            </IconButton>

            <div className="hide-on-mobile">
              <IconButton>
                <Icon>mail_outline</Icon>
              </IconButton>

              <IconButton>
                <Icon>web_asset</Icon>
              </IconButton>

              <IconButton>
                <Icon>star_outline</Icon>
              </IconButton>
            </div>
          </div>
          <div className="flex items-center">
            <MatxSearchBox />

            <NotificationBar />

            <ShoppingCart />

            <MatxMenu
              menuButton={
                <Avatar
                  className="cursor-pointer mx-2"
                  src="/assets/images/face-6.jpg"
                />
              }
            >
              <MenuItem>
                <Link className={classes.menuItem} to="/">
                  <Icon> home </Icon>
                  <span className="pl-4"> Home </span>
                </Link>
              </MenuItem>
              <MenuItem>
                {/* <Link
                className={classes.menuItem}
                to="/page-layouts/user-profile"
              > */}
                <Icon> person </Icon>
                <span className="pl-4"> Profile </span>
                {/* </Link> */}
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <Icon> settings </Icon>
                <span className="pl-4"> Settings </span>
              </MenuItem>
              <MenuItem onClick={handleSignOut} className={classes.menuItem}>
                <Icon> power_settings_new </Icon>
                <span className="pl-4"> Logout </span>
              </MenuItem>
            </MatxMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1Topbar;
