import React, { useEffect, useRef, useState } from "react";
import style from "./Feed.module.css";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FaGlobe} from "react-icons/fa";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import GifBoxIcon from "@mui/icons-material/GifBox";
import BallotIcon from "@mui/icons-material/Ballot";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Button from "@mui/material/Button";
import Profiles from "../../../component/profiles/Profiles";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Textarea from '@mui/joy/Textarea';
import MenuSection from "../leftSection/MenuSection";
import UserFollowData from "../../../component/UserFollowData";
import RightSection from "../rightSection/RightSection";
import { FaHome, FaRegBell, FaRegEnvelope, FaSearch } from "react-icons/fa";


export default function Home() {
  const storeduser = JSON.parse(localStorage.getItem("userData")) || [];
  const storedData = JSON.parse(localStorage.getItem("data")) || [];

  const userName = storeduser.find((name) => name.active.isActive === true);
  // console.log(storedData);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const [disabled, setDisabled] = useState(true);
  const [isTweet, setIsTweet] = useState(true);
  const [image, setImage] = useState("");

  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState(storedData);

  const navigate = useNavigate();
  const inputref = useRef(null);

  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, [userName]);

  function handleTweetInput(e) {
    setTweet(e.target.value);
    setDisabled(false);
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const selectedImage = reader.result;
      setImage(selectedImage);
    };
  };
  // console.log("image", image);

  function handleTweetBtn() {
    const tweetData = {
      id: Date.now(),
      name: userName.name,
      time: dateTime,
      email: userName.email,
      content: tweet,
      comments: 0,
      shareCount: 0,
      likeCount: 0,
      views: 0,
      retweet: 0,
      islike: false,
      isfollow: false,
      image: image,
      userImage: userName.userImage,
    };

    const newDatas = [tweetData, ...tweets];
   localStorage.setItem("data", JSON.stringify(newDatas))

    setTweets(newDatas);
    setTweet("");
    setImage("");
  }
  function handleDeleteTweet(userId) {
    const deleted = tweets.filter((user) => user.id != userId)
    setTweets(deleted)
    localStorage.setItem('data', JSON.stringify(deleted))
 
  }

  return (
    <>
    <div className={style.main_div}>
      <div className={style.div1}>
        <MenuSection />
      </div>

      <div className={style.div2}>
        <div className={style.scroll}>
          <div className={style.transparent}>
            <div className={style.home}>
              <span title="home page">Home </span>
            </div>
            <div className={style.insideHome}>
              <div className={style.foryou} onClick={() => setIsTweet(true)}>
                <p>For you</p>
                {isTweet ? <hr className={style.hrline} /> : ""}
              </div>
              <div
                className={style.following}
                onClick={() => setIsTweet(false)}
              >
                <p>Follwoing</p>
                {isTweet ? "" : <hr className={style.hrline} />}
              </div>
            </div>
          </div>

          <div className={style.textHeader}>
            <div className={style.profileSec}>
              {/* <AccountCircleIcon sx={{ fontSize: '50px' }} /> */}

              {userName ? (
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt="Remy Sharp"
                  src= {userName.userImage}
                />
              ) : (
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              )}
            </div>
            <div className={style.commentText}>
              
              <div >

            <Textarea sx={{focus: "none"}} className={style.twwetBox__input} minRows={2} name="content" value={tweet} placeholder="What's happening?" onChange={handleTweetInput}/>
             
              </div>
              <div className={style.globalIcon}>
            <FaGlobe />
            <span>Everyone can reply</span>
          </div>
              <div className={style.imageDiv}>
                {image && (
                  <div className="image-container">
                    <div>
                      <RxCross1 className={style.cancel__btn} onClick={() => setImage("")} />
                    </div>
                    <img src={image} alt="" width="100%" height="100%" />
                    
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={inputref}
                hidden
                onChange={handleFileInputChange}
              />

              <div className={style.texticons}>
                <div className={style.icons}>
                  <Tooltip title="Media">
                    <PhotoSizeSelectActualIcon
                      onClick={() => inputref.current.click()}
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        margin: "0 15px",
                        fontSize: "20px",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="GIF">
                    <GifBoxIcon
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        margin: "0 15px",
                        fontSize: "20px",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Poll">
                    <BallotIcon
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        margin: "0 15px",
                        fontSize: "20px",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Emoji">
                    <SentimentSatisfiedAltIcon
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        margin: "0 15px",
                        fontSize: "20px",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Schedule">
                    <WorkHistoryIcon
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        margin: "0 15px",
                        fontSize: "20px",
                      }}
                    />
                  </Tooltip>
                </div>
                <div className={style.Twittebtn}>
                  <Button
                    onClick={handleTweetBtn}
                    disabled={disabled}
                    variant="contained"
                    sx={{
                      borderRadius: "35px",
                      marginTop: "5px",
                      textTransform: "capitalize",
                      backgroundColor: "rgb(29, 155, 240)",
                    }}
                  >
                    Tweet
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={style.profile_div}>
            {isTweet ? (
              <Profiles tweets={tweets} handleDeleteTweet={handleDeleteTweet} />
            ) : (
              <UserFollowData />
            )}
          </div>
        </div>
      </div>

      <div className={style.div3}>
        <RightSection />
      </div>
    </div>
    <div className={style.bottomBar}>
          <div className={style.bottomBarList}>
            <FaHome className={style.bottom_icons} />
            <FaSearch className={style.bottom_icons} />
            <FaRegBell className={style.bottom_icons} />
            <FaRegEnvelope className={style.bottom_icons} />
          </div>
        </div>
    </>
  );
}