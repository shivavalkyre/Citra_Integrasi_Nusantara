var fs = require('fs');

const alergen = (request,response) =>{
    var body = request.body
    var resep = body.resep
    var resep_obat =[]
    console.log(resep)

    let rawdata = fs.readFileSync('obat.json');
    let obat = JSON.parse(rawdata);


    for (var i=0;i<= resep.length-1;i++){

        for(var j=0;j<=obat.length-1;j++){
            var nama_obat = obat[j].nama
            var komposisi_obat = obat[j].komposisi[0]
            Object.keys(komposisi_obat).forEach(function(key) {
                console.log('Key : ' + key + ', Value : ' + komposisi_obat[key])
                if (key == resep[i].kandungan)
                {
                    console.log(nama_obat)
                    resep_obat.push({"obat": nama_obat})
                    
                }
             })
        }
    }
    
    // var resp = {
    //     status: '00',
    //     description: 'SUCCESS',
    // };
    // resp.data = new Array(1)
    // resp.data[0] = {}
    // resp.data[0].resep = resep_obat
    response.status(200).json({"resep":resep_obat})

}
module.exports.alergen = alergen;