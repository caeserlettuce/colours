 
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var page_index = 1;
var pages = []
var colours_per_page = 56;



if (windowWidth < windowHeight) {
  // MOBILE!!!
  var node = document.createElement("link");
  node.setAttribute("rel", "stylesheet");
  node.setAttribute("href", `mobile.css`);
  document.head.appendChild(node);
  mobile = true;
}


// var page_width_interval = setInterval( () => {
//   var contents_width = document.querySelector(".entries-wrapper").offsetWidth;
//   document.querySelector(".page").style.width = `${contents_width}px`;
// }, 500);



function build_listing(json) {


  console.log(json);

  var pages_tm = document.querySelectorAll(".page-container .page-wrapper");

  for (i in pages_tm) {
    if (pages_tm[i].classList) {
      if (!pages_tm[i].classList.contains("template")) {
        pages_tm[i].remove();
      }
    }
  }

  for (i in json) {
    var node2 = document.querySelector(".colour-entry.template").cloneNode(true);
    node2.classList.remove("template");
    node2.querySelector(".colour").style.color = `${json[i]["colour"]}`;
    node2.querySelector("h2").innerHTML = `${json[i]["name"]}`;
    document.querySelector(".entries-wrapper").appendChild(node2)
  }



}

build_listing(db)