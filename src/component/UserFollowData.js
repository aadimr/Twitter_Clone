import React from 'react'
import data from '../data/userFake_DATA .json'
import Posts from './profiles/Posts'
export default function UserFollowData() {
   
    const followUser = data.filter((user) => user.isfollow === true)
    console.log(followUser.length);

  return (
    <div>
      {
        followUser.map((user,index) => {
            return(
                <Posts key={index} 
                index={index}
                content={user.content} 
                name={user.name}
                likeCount={user.linke}
                commentCount={user.coments}
                time= {user.time}
                email={user.email}
                retweet={user.retweet}
                share={user.share}
                isLike={user.islike}
                views={user.views}
                image={user.image}
                userImage={user.userImage}
                />
            )
        })
      }
    </div>
  )
}
