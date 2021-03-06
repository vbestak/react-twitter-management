import { noAuto } from "@fortawesome/fontawesome-svg-core";
import React, {useEffect, useState} from "react";

function BrowseTweetsView() {
  let [tweets, setTweets] = useState([])
  let [flag, setFlag] = useState(false)
  let body = "";

  useEffect(() => {
    fetch("/api/user-tweets", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.message);
        setTweets( t => t = data.data)
      });
  }, [flag])

  let deleteTweet = (id) => {
    fetch(`/api/tweet/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.message);
        setFlag(flag = !flag);
      });
  };

  if(Array.isArray(tweets)){
    body = tweets.map((tweet, index) => {
      return (
        <div key={index} style={tweetCSS}>
          <div>Created {tweet.created_at}</div>
          <div>
            Status: {tweet.text}{" "}
          </div>
          <button onClick={()=>deleteTweet(tweet.id_str)}>Delete</button>
        </div>
      );
    })
  }

  return (
    <div>
      <h3 style={{fontSize:'22px', fontWeight:350}}>Current user tweets:</h3>
      {body}
    </div>
  );
}

let tweetCSS = {
  width: "85%",
  margin: "0 auto",
  padding: ".5em 5px",
  borderBottom: "2px solid lightgrey"
};

export default BrowseTweetsView;
