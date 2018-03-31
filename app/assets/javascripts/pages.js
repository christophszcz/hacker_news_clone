var url = "https://hacker-news.firebaseio.com/"
var topStories = "v0/topstories.json";

var mainUrl = url + topStories;

function articleRetrieval(startingValue, endingValue){
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';   
  xhr.onreadystatechange = function()  {   
    if (xhr.readyState === XMLHttpRequest.DONE) {
      for(var i = startingValue; i < endingValue; i++){
        (function innerRequest(j){
          var xhrTwo = new XMLHttpRequest();

          xhrTwo.responseType = 'json'; 
          var number = j + 1, time = " 2 hours ago";
          xhrTwo.onreadystatechange = function()  {   
            if (xhrTwo.readyState === XMLHttpRequest.DONE) {
              document.getElementById('article' + j).innerHTML += "<span class='number'>" + number 
                                                                    + ".</span><img src='https://news.ycombinator.com/grayarrow2x.gif' class='arrow' alt='Gray Arrow' /><a href='" 
                                                                    + xhrTwo.response.url + "' class='article-name' id=" + xhr.response[j] + ">" + xhrTwo.response.title + "</a>"; 
              document.getElementById('article' + j).innerHTML += "<p class='second-line'>" + xhrTwo.response.score + " points by " 
                                                                    + "<a href='https://news.ycombinator.com/user?id=" + xhrTwo.response.by 
                                                                    + "' class='second-line-link'>" + xhrTwo.response.by + "</a>" + time 
                                                                    + "<a href='https://news.ycombinator.com/hide?id=" + xhr.response[j] + "&goto=news' class='second-line-link'>" + " | hide | " + "</a>" + " <a href='https://news.ycombinator.com/item?id=" 
                                                                    + xhr.response[j] + "' class='second-line-link'>" + xhrTwo.response.descendants 
                                                                    + " comments</p>";  
            }   
          }; 

          xhrTwo.open('GET', url + 'v0/item/' + xhr.response[j]  + '.json?print=pretty');              
          xhrTwo.send();
        })(i);
      }
    }   
  };

  xhr.open('GET', mainUrl);              
  xhr.send(); 
}

articleRetrieval(0,30);

//Scroll To The Bottom

window.addEventListener("scroll", function scrollToBottom(event){
  var totalHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                          document.documentElement.clientHeight, document.documentElement.scrollHeight, 
                          document.documentElement.offsetHeight);

  if(document.documentElement.scrollTop + window.innerHeight == totalHeight) {
    articleRetrieval(30,60);
    document.getElementById('additional-articles').style.display = 'initial';
    event.currentTarget.removeEventListener(event.type, scrollToBottom);
  }
});
