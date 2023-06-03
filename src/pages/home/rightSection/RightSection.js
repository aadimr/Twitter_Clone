import React, { useState } from "react";
import style from "./RightSection.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import Tooltip from "@mui/material/Tooltip";
import { Button, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function RightSection() {
  
  const happeningData =JSON.parse(localStorage.getItem('followData')) || []

  const [showMore, setShowMore] = useState(true);
  const [follow1, setFollow] = useState(true);
  const [follow2, setFollow2] = useState(true);
  const [follow3, setFollow3] = useState(true);
  const [follow4, setFollow4] = useState(true);
  const [list, setList] = useState(happeningData.slice(0,4));

  function handleShowMore() {
    if (list) {
      setList(happeningData);
      setShowMore(!showMore);
    }
  }
  function handleShowLess() {
    if (list) {
      setList(happeningData.slice(0, 4));
      setShowMore(!showMore);
    }
  }

  function handleClcik() {
    setFollow(!follow1);
  }

  function handleNotInterested(id) {
    const deleted = list.filter((ele) => ele.id !== id );
    localStorage.setItem('followData', JSON.stringify(deleted))
    // console.log(deleted);
    setList(deleted);
  }

  return (
    <div className={style.main_Div}>
      <div className={style.rightSroll}>
        <div className={style.fixe}>
          <div className={style.search_bar}>
            <SearchIcon />
            <input type="text" placeholder="Search twitter" />
          </div>
        </div>

        <div className={style.happen}>
          <div className={style.head}>
            <span>what's happening</span>
          </div>
       
          <div className={style.box}>
            {list.map((user, index) => {
              return (
                <div key={index} className={style.mapBox}>
                  <div>
                    <div className={style.title}>
                      <p>{user.title}</p>
                    </div>
                    <div className={style.name}>
                      <span>{user.name}</span>
                    </div>
                    <div className={style.tweets}>
                      <p>{user.tweets} </p>
                    </div>
                  </div>

                  <div className={style.more}>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <div>
                          <div
                            className={style.userData}
                            {...bindTrigger(popupState)}
                          >
                            <Tooltip title="More">
                              <MoreHorizSharpIcon sx={{ fontSize: "15px" }} />
                            </Tooltip>
                          </div>

                          <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                          >
                            <Typography
                              sx={{
                                p: 1,
                                cursor: "pointer",
                                ":hover": { background: "#f5f4f2" },
                              }}
                            >
                              <span
                                className={style.popoverName}
                                onClick={() => handleNotInterested(user.id)}
                              >
                                {" "}
                                <SentimentVeryDissatisfiedIcon
                                  sx={{ fontSize: "17px" }}
                                />{" "}
                                Not interested in this
                              </span>
                            </Typography>
                            <Typography
                              sx={{
                                p: 1,
                                cursor: "pointer",
                                ":hover": { background: "#f5f4f2" },
                              }}
                            >
                              <span className={style.popoverName}>
                                {" "}
                                <SentimentVeryDissatisfiedIcon
                                  sx={{ fontSize: "17px" }}
                                />{" "}
                                This trend is harmful or spammy
                              </span>
                            </Typography>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                  </div>
                </div>
              );
            })}
          </div>
 
          <div className={style.showmore}>
            {showMore ? (
              <Link onClick={handleShowMore} underline="none">
                show more
              </Link>
            ) : (
              <Link onClick={handleShowLess} underline="none">
                show less
              </Link>
            )}
          </div>
        </div>
            

        <div className={style.follow}>
          <div className={style.toFollow}>
            <span>Who to follow </span>
          </div>
          <div className={style.Data}>
            <Data
              src="https://i.pravatar.cc/150?img=29"
              name= "Priyanka"
              email='@priyanka'
              onClick={handleClcik}
              follow={follow1 ? "Follow" : "following"}
            />
            <Data
              src="https://i.pravatar.cc/150?img=21"
              name="AmirKhan"
              email='@amir'
              onClick={() => setFollow2(!follow2)}
              follow={follow2 ? "Follow" : "Following"}
            />
            <Data
              src="https://i.pravatar.cc/150?img=20"
              name="salman"
              email='@salman'
              onClick={() => setFollow3(!follow3)}
              follow={follow3 ? "Follow" : "following"}
            />
            <Data
              src="https://i.pravatar.cc/150?img=25"
              name='Virat'
              email='@virat'
              onClick={() => setFollow4(!follow4)}
              follow={follow4 ? "Follow" : "Following"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Data({ src, name, email, onClick, follow }) {
  return (
    <div className={style.toFollowBox}>
      <div className={style.avtar}>
        <Avatar alt="name" src={src} />
      </div>
      <div className={style.followName}>
        <h4>{name}</h4>
        <span>{email}</span>
      </div>
      <div className={style.followBtn}>
        <Button
          sx={{
            backgroundColor: "black",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
          variant="contained"
          onClick={onClick}
        >
          {follow}
        </Button>
      </div>
    </div>
  );
}
