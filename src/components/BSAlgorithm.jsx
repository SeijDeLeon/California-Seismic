const BaseShearDiagram = () => {

    //assuming that SDS, R, Ie is given

    const CS2 = (Sds / (R/Ie));
    const CS3 = (Sd1 / (T (R/Ie)));
    const CS4 = ((Sd1*TL / (T2* (R/Ie))));
    const CS = 0;

    if (T<TL && CS2 > CS3){
        console.log(CS);
        CS = CS3;
    };
    elif(CS2 > CS4);{ 
        console.log(CS);
        CS = CS4;
    };

    const v = CS * W;
    console.log(v);

};