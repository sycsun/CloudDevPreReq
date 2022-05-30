function func(developers) {
    var x;
    var result = [];
    var outText = 'result:';
    console.log(developers);

    developers.forEach(element => {
        console.log(element);
        result.push(element.code());
        // console.log(result);
    });



    module.exports = Promise.allSettled(result).then((done) => {
        console.log('success');
        done.forEach((each, index, done) => {
            console.log(index);
            outText += each.value;
            if (index < done.length - 1) {
                outText += '\n';
            }
        })
        console.log(done);
        console.log(outText);
    });


    console.log('promise will be started---------------');

}
