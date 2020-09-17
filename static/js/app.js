
const urlContent = document.getElementById('url_content');

let obj = JSON.parse(urlContent.textContent);

const content = document.getElementById('content');

const items = { ...localStorage };

console.log(items);

if(obj.short_url !== "" && obj.long_url !== "") {
  localStorage.setItem(obj.long_url, obj.short_url);
}

content.innerHTML = '';


for (let key in items){
  if(items.hasOwnProperty(key)){
    console.log(`${key} : ${items[key]}`)
    let outerDiv = document.createElement('div');
    outerDiv.classList.add('url-card');
    
    
    let section = document.createElement('section');

    let p = document.createElement('p');
    p.textContent = `Long URL: ${key}`
    
    let link = document.createElement('a');
    link.setAttribute('href', `https://${items[key]}`);
    link.setAttribute('id', `${items[key]}`);
    link.textContent = `Short URL: ${items[key]}`
    link.setAttribute('target', '_blank');
    
    section.appendChild(p);
    section.appendChild(link);
    
    let article = document.createElement('article')
    
    let button = document.createElement('a');
    button.setAttribute('href', '/clear');
    button.setAttribute('id', key);
    button.textContent = 'Remove';
    button.classList.add('remove-btn');
    
    // console.log(div);
    article.appendChild(button);
    
    outerDiv.appendChild(section);
    outerDiv.appendChild(article);
    
    content.appendChild(outerDiv);
  }
}
  
//add this js script into the web page,
//you want reload once after first load
window.onload = function() {
  //considering there aren't any hashes in the urls already
  if(!window.location.hash) {
      //setting window location
      window.location = window.location + '#loaded';
      //using reload() method to reload web page
      window.location.reload();
  }
}