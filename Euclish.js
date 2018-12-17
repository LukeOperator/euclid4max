autowatch = 1;
inlets = 1;
outlets = 2;

function calc (a,b) {
if(a == 0 || b == 0){
  return 0;
}
else{
  var total = [];

  //make an array of 1s the total length of the bar

  for (i = 0; i < a; i++){
    total.push(1);
  }

  //strip the bar into groups of b + remainder

  var bar = [];
  var rit = [];
  var block;

  while(total.length){

    rit = total.splice(0,b);

    block = rit.length;

    bar.push(block);
  }

	var euclid = [];
	var sel;

  //select each beat group and count it out as a 1 followed by 0s
  //4 = (1, 0, 0, 0)     3 = (1, 0, 0) etc.
	for(i=0; i<bar.length; i++){
		sel = bar[i];
		euclid.push(1);

		for(t = 0; t < sel-1; t++){
			euclid.push(0);
		}
	}


  outlet(0, euclid);
	outlet(1, bar);

  }
}
