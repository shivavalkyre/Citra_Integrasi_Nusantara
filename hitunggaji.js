
const hitunggaji = (request,response) =>{
var body = request.body;
var employee = body.employee;
var komponengaji = body.komponengaji
var data
var kurs = employee.mata_uang;
var status = employee.status;
var gaji_gross =0
var gaji_net =0
var gaji_pokok=0
var lembur =0
var transport =0
var makan =0
var asuransi=0
var asuransi_disetahunkan=0
var gaji_disetahunkan = 0
var pkp =0
var ptkp =0
var pajak_layer1=0
var pajak_layer2=0
var pajak=0
var pph21_terhutang_perbulan=0
var persen_pajak=""

console.log('==================================== START ================================')

if (kurs == 'IDR')
{
    if (status == 'TK')
    {
        ptkp = nilaiPTKP(status)
    }else if( status == 'K0'){
        ptkp = nilaiPTKP(status)
    }else if (status == 'K1'){
        ptkp = nilaiPTKP(status)
    }else{
        var obj = {"status":false,"data":'model perhitungan tidak ditemukan'}
        data = obj
    }

    
for (var i=0; i<= komponengaji.length-1;i++)
{
    if (i==0)
    {
        gaji_pokok = komponengaji[i].gaji_pokok
    }else if(i==1){
        lembur = komponengaji[i].lembur
    }else if(i==2){
        transport = komponengaji[i].transport
    }else if(i==3){
        makan = komponengaji[i].makan
    }
}
gaji_gross = gaji_pokok + transport + lembur + makan
gaji_disetahunkan = gaji_gross * 12 
pkp = gaji_disetahunkan - ptkp

// perhitungan pajak progresif 

if (pkp > 50000000){
    // hitung 50jt layer 1
    pajak_layer1 = 50000000 * 0.05
    persen_pajak = persen_pajak + "5%,"
    if ((pkp - 50000000) >50000000 && (pkp - 50000000) <= 250000000){
        pajak_layer2 = (pkp - 50000000) * 0.1
        persen_pajak = persen_pajak + "10%,"
    }else if ((pkp - 50000000) >50000000 && (pkp - 50000000) >= 250000000){
        pajak_layer2 = (pkp - 50000000) * 0.15
        persen_pajak = persen_pajak + "15%,"
    }

}else if(pkp<=50000000){
    pajak_layer1 = 50000000 * 0.05
    persen_pajak = persen_pajak + "5%"
}

pajak = pajak_layer1 + pajak_layer2;
pph21_terhutang_perbulan = pajak/12;

}else{
    if (status == 'TK')
    {
        ptkp = nilaiPTKP(status)
    }else if( status == 'K0'){
        ptkp = nilaiPTKP(status)
    }else{
        var obj = {"status":false,"data":'model perhitungan tidak ditemukan'}
        data = obj
    }

        
for (var i=0; i<= komponengaji.length-1;i++)
{
    if (i==0)
    {
        gaji_pokok = komponengaji[i].gaji_pokok
    }else if(i==1){
        lembur = komponengaji[i].lembur
    }else if(i==2){
        transport = komponengaji[i].transport
    }else if(i==3){
        makan = komponengaji[i].makan
    }else{
        asuransi = komponengaji[i].asuransi 
    }
}
asuransi_disetahunkan = asuransi * 12
gaji_gross = gaji_pokok + transport + lembur + makan 
gaji_disetahunkan = gaji_gross * 12 
pkp = gaji_disetahunkan - ptkp

// perhitungan pajak progresif 
if(pkp<=50000000){
    pajak_layer1 = 50000000 * 0.0025
    persen_pajak = persen_pajak + "2.5%,"
}else{
    pajak_layer1 = 50000000 * 0.0025
    persen_pajak = persen_pajak + "2.5%,"
    pajak_layer2 = (pkp - 50000000) * 0.075
    persen_pajak = persen_pajak + "7.5%,"
}
pajak = pajak_layer1 + pajak_layer2;
pph21_terhutang_perbulan = pajak/12;
}

console.log('gaji_gross:',gaji_gross)
console.log('ptkp:',ptkp)
console.log('pkp:',pkp)
console.log('pajak:',pajak)
console.log('pph21_terhutang_perbulan:',pph21_terhutang_perbulan)

var obj ={
    "gaji_gross": gaji_gross,
    "ptkp" : ptkp,
    "pkp" : pkp,
    "persen_pengenaan_pajak": persen_pajak,
    "pph21_terhutang":pajak,
    "pph21_terhutang_perbulan":pph21_terhutang_perbulan
}
data = obj

response.status(200).json({data: data})
}
module.exports.hitunggaji = hitunggaji

function nilaiPTKP(status){
    var result =0
    switch (status) {
        case 'TK':
            result = 25000000
            break;
        case 'K0':
            result = 50000000
            break;
        case 'K1':
            result = 75000000
            break;
    }
    return result;
}

function nilaiPTKP1(status){
    var result =0
    switch (status) {
        case 'TK':
            result = 15000000
            break;
        case 'K0':
            result = 30000000
            break;
    }
    return result;
}

