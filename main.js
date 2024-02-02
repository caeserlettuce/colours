var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var page_index = 1;
var pages = []
var colours_per_page = 56;
var sort_method = 0; // 0 = in sequence as of the db, 1 = alphabetical order

function copyclip(idiot) {
  navigator.clipboard.writeText(idiot); 
}

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

var notif_timeout_1;
var notif_timeout_2;
var notif_timeout_3;

function notif(message, red=false) {
  clearTimeout(notif_timeout_1);
  clearTimeout(notif_timeout_2);
  clearTimeout(notif_timeout_3);
  document.querySelector(".notif h2").innerHTML = message;
  if (red == true) {
    document.querySelector(".notif").classList.add("red");
  } else {
    document.querySelector(".notif").classList.remove("red");
  }
  document.querySelector(".notif").style.display = "unset";
  notif_timeout_1 = setTimeout( () => {
    document.querySelector(".notif").style.opacity = "1";
  }, 10);
  notif_timeout_2 = setTimeout( () => {
    document.querySelector(".notif").style.opacity = "0";
    notif_timeout_3 = setTimeout( () => {
      document.querySelector(".notif").style.display = "none";
    }, 500);
  }, 2000);
}

function funnycopy(col) {
  console.log(col);
  try {
    copyclip(col);
    notif("copied to clipboard.");
  } catch (err) {
    notif("there was an error copying to clipboard!", true);
  }
  
}

function build_listing(json) {


  console.log(json);

  var pages_tm = document.querySelectorAll(".page-container .page-wrapper");

  var node = document.querySelector(".colour-entry.template").cloneNode(true);
  document.querySelector(".entries-wrapper").innerHTML = "";
  document.querySelector(".entries-wrapper").appendChild(node);

  for (i in json) {
    var node2 = document.querySelector(".colour-entry.template").cloneNode(true);
    node2.classList.remove("template");
    node2.querySelector(".colour").style.color = `${json[i]["colour"]}`;
    node2.querySelector(".colour").setAttribute("onclick", `funnycopy("${json[i]["colour"]}")`);
    node2.querySelector("h2").innerHTML = `${json[i]["name"]}`;
    document.querySelector(".entries-wrapper").appendChild(node2)
  }



}

build_listing(db);


function search_method(json, query) {
  var query = query.toLowerCase();
  var db_out = [];

  for (i in json) {
    var col = json[i];
    if (`${col["name"].toLowerCase()}`.includes(query)) {
      db_out.push(col);
    } else if (`${col["colour"].toLowerCase()}` == query) {
      db_out.push(col);
    }
  }
  return(db_out)
}

function do_funny_search(json) {
  var search_query = document.querySelector(".search").value;
  console.log(search_query)
  if (search_query.replace(" ") != "") {
    build_listing(search_method(json, search_query));
  } else {
    build_listing(json);
  }
}

document.querySelector(".search").addEventListener("keyup", (event) => {
  do_funny_search(db);
});

function sort_button() {
  if (sort_method == 0) { // to alphabetical order
    sort_method = 1;
    
    var db_obj = {};
    var db_during = [];
    var db_out = [];
    for (i in db) {
      db_during.push(db[i]["name"]);
      db_obj[db[i]["name"]] = db[i];
    }
    db_during.sort();
    for (i in db_during) {
      db_out.push(db_obj[db_during[i]]);
    }
    console.log(db_during)
    console.log(db_obj)
    console.log(db_out)
    do_funny_search(db_out);
    document.querySelector(".sortbutton").innerHTML = "A";
    document.querySelector(".sortbutton").setAttribute("title", "sorting by alphabetical order");
    
  } else if (sort_method == 1) {  // to db order order
    sort_method = 0;
    do_funny_search(db);
    document.querySelector(".sortbutton").innerHTML = "#";
    document.querySelector(".sortbutton").setAttribute("title", "sorting by date added");
  }

}