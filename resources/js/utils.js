class Utils {
    formatAsThousands =((value)=>{
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    })
}

const utils  = new Utils();

export default  utils;