var arr_booking =[]
var moment = require('moment')
var prev_end_booking


const create = (request,response) =>{
    var bookingdate = request.params.bookingdate;
    var durasi = request.params.durasi;
    var durasi_kosong = parseInt(request.params.durasi) + 2
    console.log('durasi:',durasi)
    var tgl_booking = bookingdate.substring(0,10)
    console.log('tgl_booking:',tgl_booking)
    var jam_booking = bookingdate.substring(11,19)
    console.log('jam_booking:',jam_booking)

   
    var d = new moment(jam_booking, 'HH:mm');
    var end_booking = moment(d).add(durasi_kosong, 'hours').format('HH:mm');

    var obj ={"date":tgl_booking,"start_booking":jam_booking,"durasi": durasi,"end_booking":end_booking,"status":true}
    
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = year+'/'+(month<10?('0'+month):month)+'/'+(day<10?('0'+day):day)


    if (currentDate!=tgl_booking){
        arr_booking = []
    }else{
        console.log('arr_booking.length:',arr_booking.length)
        if (arr_booking.length == 0)
        {
            arr_booking.push(obj)
        
        }else{
            // cek data booking
            for (var i=0;i<=arr_booking.length-1;i++){
                console.log('obj.start_booking',obj.start_booking)
                console.log('arr_booking[i].end_booking',arr_booking[i].end_booking)
                console.log('obj.start_booking>=arr_booking[i].end_booking',obj.start_booking>=arr_booking[i].end_booking)
                if (obj.start_booking >= arr_booking[i].end_booking)
                {
                    if (i == arr_booking.length-1){
                    arr_booking.push(obj)
                    break;
                    }
                }else{
                    obj.status = false
                    if (i == arr_booking.length-1){
                        arr_booking.push(obj)
                        break;
                    }
                   
                }
            }
        }
    }
    response.status(200).json({data: arr_booking[arr_booking.length-1].status})
}

module.exports.create = create;