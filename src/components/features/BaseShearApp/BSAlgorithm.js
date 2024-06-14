//this is not a functioning file
/* const BaseShearDiagram = () => {

  //assuming that S1, SDS, R, Ie is given

  const CS2 = (Sds / (R/Ie)); //12.8-2
  const CS3 = (Sd1 / (T (R/Ie))); //12.8-3
  const CS4 = ((Sd1*TL / (T^2* (R/Ie)))); //12.8-4
  const CS = 0;
  //CS = CS2

  if (T<TL && CS2 > CS3){
      console.log(CS);
      CS = CS3;
  };
  elif(T>TL && CS2 > CS4);{
      console.log(CS);
      CS = CS4;
  };

  //check minimum values
  //Equation 12.8-5
  CS = MATH.max(CS, 0.044*Sds*Ie, 0.01);

  //check minimum values
  //if S1 >= 0.6g this eqn applies
  if (S1 >= 0.6) {
      CS = MATH.max(CS, 0.5*S1/(R/Ie));
  }
  const V = CS * W; //12.8-1
  console.log(v);

}; */