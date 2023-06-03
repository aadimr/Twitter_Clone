import React from 'react'
import Posts from './Posts'



export default function Profiles({tweets,handleDeleteTweet}) {
    


    return (
        <div>
            
            {
                tweets.map((user, index) => {
                    return (
                        <Posts key={index} 
                         index={index}
                         content={user.content} 
                         name={user.name}
                         likeCount={user.likeCount}
                         commentCount={user.comments}
                         time= {user.time}
                         email={user.email}
                         retweet={user.retweet}
                         share={user.share}
                         isLike={user.islike}
                         views={user.views}
                         userId={user.id}
                         user={user}
                         image={user.image}
                         userImage= {user.userImage}
                         handleDeleteTweet={handleDeleteTweet}
                         
                         />
                    )
                })
            }
        </div>
    )
}
