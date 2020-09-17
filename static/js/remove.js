const btns = document.querySelectorAll('.remove-btn');
// const items = { ...localStorage };


Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

// Get the size of an object
var size = Object.size(items);

console.log(size);
console.log(items.length);
console.log(btns);

btns.forEach(btn => {
  btn.addEventListener('click', ()=> {
    if(size == 1){
      localStorage.clear();
      location.reload();
    } else {
      console.log(btn.getAttribute('id'));
      localStorage.removeItem(btn.getAttribute('id'));
      location.reload()
    }
  })
})