import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button } from "@mui/material";
import style from "./MenuSection.module.css";
import Avatar from "@mui/material/Avatar";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";



export default function MenuSection() {
    const navigate = useNavigate()
  const userDetails = JSON.parse(localStorage.getItem("userData")) || [];
  const userName = userDetails.find((name) => name.active.isActive === true);

  const menu = [
    {
      icon: HomeIcon,
      Name: "Home",
    },
    {
      icon: TagIcon,
      Name: "Explore",
    },
    {
      icon: NotificationsNoneIcon,
      Name: "Notifications",
    },
    {
      icon: EmailOutlinedIcon,
      Name: "Messages",
    },
    {
      icon: BookmarkBorderOutlinedIcon,
      Name: "Bookmarks",
    },
    {
      icon: FaClipboardList,
      Name: "Twitter Blue",
    },
    {
      icon: PersonOutlineOutlinedIcon,
      Name: "Profile",
    },
    {
      icon: CgMoreO,
      Name: "More",
    },
  ];


  function handleLogout(){
   

  if(userName){
    userName.active.isActive = false
    localStorage.setItem('userData', JSON.stringify(userDetails))
    // localStorage.removeItem('data')
    // localStorage.removeItem('followData')
    navigate('/login')
  }

  }

  return (
    <div className={style.main_Dive}>
      <div>
        <span className={style.tweet_logo} onClick={()=> navigate('/')}>
          <TwitterIcon
            sx={{
              color: " rgb(29, 155, 240)",
              fontSize: "30px",
            }}
          />{" "}
        </span>
      </div>

      {menu.map((item, index) => {
        return (
          <li key={index} className={style.list}>
            {<item.icon className={style.icons} />} <span>{item.Name}</span>
          </li>
        );
      })}
      <div className={style.tweetBtn}>
        <Button
          variant="contained"
          sx={{
            borderRadius: "35px",
            marginTop: "5px",
            width: "15vw",
            textTransform: "capitalize",
            height: "8vh",
            fontWeight: "800",
            backgroundColor: "rgb(29, 155, 240)",
          }}
        >
          Tweet
        </Button>
      </div>

      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>

            <div className={style.userData} {...bindTrigger(popupState)}>
              <div className={style.pimage}>
              {userName ? (
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt="Remy Sharp"
                  src={userName.userImage}
                />
              ) : (
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              )}
              </div>
              <div className={style.username}>
                <div>
                  <span className={style.name}>{userName? userName.name : ''} </span>
                </div>
                <div>
                  <span className={style.email}>{userName? userName.email : ''}</span>
                </div>
              </div>
              <div className={style.More}>
                <MoreHorizSharpIcon />
              </div>
            </div>

            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{
                  p: 1.5,
                  cursor: "pointer",
                  ":hover": { background: "#f5f4f2" },
                }}
              >
                <span className={style.popoverName} onClick={() => navigate('/login')}>
                  {" "}
                  Add an existing account
                </span>
              </Typography>
              <Typography
                sx={{
                  p: 1.5,
                  cursor: "pointer",
                  ":hover": { background: "#f5f4f2" },
                }}
              >
                <span className={style.popoverName} onClick={handleLogout}>
                  {" "}
                  Log out {userName? userName.email : ''}
                </span>
              </Typography>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}