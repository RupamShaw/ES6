"use strict"

//var defer = Promise.defer() //defer is obsolete
 //console.log(defer)

// Immediatley Resolved
var myPromise = Promise.resolve('Foo');

myPromise.then((res) => console.log(res));


var myPromise = new Promise(function(resolve, reject){
  setTimeout(() => resolve(4), 2000);
});
myPromise.then((res) => {
  res +=3;
  console.log(res);
});

//gettting json data and render in html
function getData(method, url){
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function(){
      if(this.status >= 200 && this.status < 300){
        resolve(xhr.response);
      }else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function(){
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

getData('GET', 'http://jsonplaceholder.typicode.com/todos').then(function(data){
  let todos = JSON.parse(data);
  let output = '';
  for(let todo of todos){
    output += `
      <li>
        <h3>${todo.title}</h3>
        <p>Completed: ${todo.completed}</p>
      </li>
    `;
  }

  document.getElementById('template').innerHTML = output;
}).catch(function(err){
  console.log(err);
});


////https://www.youtube.com/watch?v=s6SH72uAn3Q  3 different Promises also 
let cleanTheRoom = function() {
    return new Promise(function(resolve, reject) {
      resolve('Cleaned the Room, ');
    });
  };
  
  let removedTheGarbage = function(message) {
    return new Promise(function(resolve, reject) {
      resolve(message + 'removed the garbage, ');
    });
  };
  
  let getIcecream = function(message) {
    return new Promise(function(resolve, reject) {
      resolve(message + 'got icecream.');
    });
  };
  
  cleanTheRoom()
    .then(removedTheGarbage)
    .then(getIcecream)
    .then(function(message) {
      console.log('This is the message finished task \n' + message);
    });
  // all above can be done with promise.all 

  Promise.all([ cleanTheRoom(),removedTheGarbage(), getIcecream()]).then(function(done){
      console.log('Everythings done..'+ done);
  }); 

