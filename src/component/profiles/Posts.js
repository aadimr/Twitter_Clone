import React, { useState } from "react";
import "./Posts.css";
import { GoVerified } from "react-icons/go";
import Tooltip from "@mui/material/Tooltip";
import IosShareIcon from "@mui/icons-material/IosShare";
import EqualizerSharpIcon from "@mui/icons-material/EqualizerSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Avatar from "@mui/material/Avatar";

const Posts = ({
  content,
  name,
  likeCount,
  commentCount,
  email,
  retweet,
  views,
  userId,
  image,
  userImage,
  handleDeleteTweet,
}) => {
  const [like, setLike] = useState(true);
  const [likesCount, setLikeCount] = useState(likeCount);

  function handleLike() {
    setLike(!like);
    if (like) {
      setLikeCount(likesCount + 1);
    } else {
      setLikeCount(likesCount - 1);
    }
  }

  return (
    <div className="postss">
      <div className="postss__first">
        <div className="top_detail">
          <div className="posts__first__img">
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt="Remy Sharp"
              src={userImage}
            />
          </div>
          <div className="user_names">
            <div className="posts__first__name">
              <strong>{name}</strong>
              <GoVerified className="verify" />
              <span>{email}</span>
            </div>

            <div className="more">
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <div {...bindTrigger(popupState)}>
                      <Tooltip title="More">
                        <MoreHorizSharpIcon />
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
                        <span onClick={() => handleDeleteTweet(userId)}>
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
                        <span>
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
        </div>
      </div>
      <div className="postss__details">
        <div className="postss__details__msg">{content}</div>
        <div className="postss__details__img">
          {image && <img onDoubleClick={handleLike} src={image} alt="post" />}
        </div>
        <div className="reactions">
          <span className="comment">
            <Tooltip title="Reply">
              <ModeCommentOutlinedIcon sx={{ fontSize: "18px" }} />
            </Tooltip>{" "}
            {commentCount}
          </span>

          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <span className="retweet">
                  <Tooltip title="Retweet">
                    <RepeatIcon
                      {...bindTrigger(popupState)}
                      sx={{ fontSize: "18px" }}
                    />
                  </Tooltip>{" "}
                  {retweet}
                </span>

                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography
                    sx={{
                      p: 0.5,
                      cursor: "pointer",
                      ":hover": { background: "#f5f4f2" },
                    }}
                  >
                    {" "}
                    <span>
                      <RepeatIcon />
                    </span>{" "}
                    Retweet
                  </Typography>
                  <Typography
                    sx={{
                      p: 0.5,
                      cursor: "pointer",
                      ":hover": { background: "#f5f4f2" },
                    }}
                  >
                    {" "}
                    <span>
                      <DriveFileRenameOutlineIcon />
                    </span>{" "}
                    Quote Tweet
                  </Typography>
                </Popover>
              </div>
            )}
          </PopupState>

          <span className="like" onClick={handleLike}>
            {like ? (
              <Tooltip title="Like">
                <FavoriteBorderIcon sx={{ fontSize: "18px" }} />
              </Tooltip>
            ) : (
              <Tooltip title="Unlike">
                <FavoriteIcon sx={{ color: "red" }} />
              </Tooltip>
            )}{" "}
            {likesCount}
          </span>
          <span className="views">
            <Tooltip title="View">
              <EqualizerSharpIcon sx={{ fontSize: "18px" }} />
            </Tooltip>{" "}
            {views}
          </span>
          <span className="share">
            <Tooltip title="share">
              <IosShareIcon sx={{ fontSize: "18px" }} />
            </Tooltip>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Posts;
