autowatch = 1;
inlets = 1;
outlets = 2;

function calc(a,b,c,d,e) {

  var total = a;
  var gnum = b;
  var space = c;
  var rot = d;
  var rev = e;

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

    //does a/b return an integer? No need to do anything else then
    if (mod == 0){
      while(total){
        //this will give us gnum groups of total
        total = total - div;
        bar.push(div);
      }
    }

    //a/b doesn't return an integer and isn't less than 1. Time to Euclidimatise!
    else{
      //until we hit the remainder, do as before
      while(total > mod){
        total = total - div;
        bar.push(div);
      }


      //distribute remainder to the bar, with the spacing and rotation provided

      //if spacing is equal to bar length, make it not. In two minds whether to keep this or not, comment it out if you want to pile all the remainder into one group
      if (space % bar.length == 0){
        space = 1;
      }



      for(i = 0; i < mod; i++){

        //create spacing and keep it within the array
        var _space = space * i;

        while(_space > bar.length){
          _space -= bar.length
        }

        //this is a bodge that makes sense if you write out the case of 9 into 6 groups with different spacings
        if(_space == bar.length){
          _space -= 1;
        }

        //at that spacing, add 1 from the remainder
        bar[_space] += 1;
      }

      //some permutations are only accessible by retrogrades of this algorithm
      if(rev){
        bar.reverse();
      }

      //rotate the beats in the bar
      for (i=0; i< rot; i++) {
        var pop = bar.pop();
        bar.unshift(pop);
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
