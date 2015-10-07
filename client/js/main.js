// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

var wineType1;
var wineType2;
var wineType3;
//make these an array of the wines

chooseWine = function(food) {
  if(food === 'brunch'){
    wineType1 = 'champagne';
    wineType2 = 'rose';
    wineType3 = 'chardonnay';
  } else if (food === 'chicken'){
    wineType1 = 'chardonnay';
    wineType2 = 'sauvignon+blanc';
    wineType3 = 'cotes+du+rhone';
  } else if (food === 'fish'){
    wineType1 = 'pinot+grigio';
    wineType2 = 'sauvignon+blanc';
    wineType3 = 'chardonnay';
    } else if (food === 'pork'){
    wineType1 = 'chianti';
    wineType2 = 'pinot+noir';
    wineType3 = 'chardonnay';
    } else if (food === 'beef'){
    wineType1 = 'barolo';
    wineType2 = 'cabernet';
    wineType3 = 'zinfandel';
    } else if (food === 'lamb'){
    wineType1 = 'malbec';
    wineType2 = 'syrah';
    wineType3 = 'pinot+noir';
    } else if (food === 'veal'){
    wineType1 = 'pinot+noir';
    wineType2 = 'merlot';
    wineType3 = 'zinfandel';
    } else if (food === 'pasta'){
    wineType1 = 'sangiovese';
    wineType2 = 'zinfandel';
    wineType3 = 'chardonnay';
    } else {
      alert("You haven't chosen a food!");
    }
  // console.log(wineType);
  return wineType1, wineType2, wineType3;
};

