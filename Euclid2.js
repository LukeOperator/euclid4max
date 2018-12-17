autowatch = 1;
inlets = 1;
outlets = 2;

function calc(a,b) {

  var total = a;
  var gnum = b;

  if (total == 0 || gnum == 0){
    //please don't run if anyone inputs 0
    return 0;
  }
  else if(gnum>total){
    //if someone wants more groups than we can give them, please don't crash
    var bar = [];

    for (i = 0; i < total; i++){
      bar.push(1);
    }

  }
  else {
    //total split into number of groups
    var div = Math.floor(total / gnum);
    var mod = total % gnum;

    //make a bar
    var bar =[];

    if (mod == 0){
      while(total){
        //this will give us gnum groups of total
        total = total - div;
        bar.push(div);
      }

    }
    else{
      //until we hit the remainder, do as before
      while(total > mod){
        total = total - div;
        bar.push(div);
      }
      //distribute the remainder to the bar
      for(i = 0; i < mod; i++){
        bar[i] = bar[i] + 1;
      }
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
  //you can havce the array already prerpared for a multislider or take it as raw note lengths if you want.
	outlet(0, euclid);
	outlet(1, bar);
  }
}
