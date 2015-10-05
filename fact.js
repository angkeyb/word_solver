function fact(val){
  if (val <  1) return 0;

  var result = val;
  for (i = val-1; i > 0; i-=1 ){
    result  = result * i;
  }
  return result;
}
