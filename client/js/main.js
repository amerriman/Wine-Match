// add scripts
// $(document).on('ready', function() {
//   console.log('sanity check!');
// });

var wineType1;
var wineType2;
var wineType3;
var mealType;

//make these an array of the wines

chooseWine = function(food) {
    mealType = food;
  if(food === 'brunch'){
    wineType1 = 'Champagne';
    wineType2 = 'Rose';
    wineType3 = 'Chardonnay';
  } else if (food === 'chicken'){
    wineType1 = 'Chardonnay';
    wineType2 = 'Sauvignon+Blanc';
    wineType3 = 'cotes+du+rhone';
  } else if (food === 'fish'){
    wineType1 = 'Pinot+Grigio';
    wineType2 = 'Sauvignon+Blanc';
    wineType3 = 'Chardonnay';
    } else if (food === 'pork'){
    wineType1 = 'Chianti';
    wineType2 = 'Pinot+Noir';
    wineType3 = 'Chardonnay';
    } else if (food === 'beef'){
    wineType1 = 'Barolo';
    wineType2 = 'Cabernet';
    wineType3 = 'Zinfandel';
    } else if (food === 'lamb'){
    wineType1 = 'Malbec';
    wineType2 = 'Syrah';
    wineType3 = 'Pinot+Noir';
    } else if (food === 'veal'){
    wineType1 = 'Pinot+Noir';
    wineType2 = 'Merlot';
    wineType3 = 'Zinfandel';
    } else if(food === 'pasta'){
    wineType1 = 'Sangiovese';
    wineType2 = 'Zinfandel';
    wineType3 = 'Chardonnay';
    }
    // else {
    //   alert("You haven't chosen a food!");
    // }
  // console.log(wineType);
  return wineType1, wineType2, wineType3, mealType;
};

