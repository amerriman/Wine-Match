// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

var wineType;

chooseWine = function(food) {
  if(food === 'brunch'){
    wineType = 'champagne';
  } else if (food === 'beef'){
    wineType = 'cabernet';
  }
  // console.log(wineType);
  return wineType;
};

