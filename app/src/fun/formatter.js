export const formatAddress = function(address){
    let addr='';
    if(address!=''){
        addr = address.slice(0, 6);
        addr=addr+'....'+address.slice(address.length-6, address.length);
    } else {addr='';}
    return addr;
}
export const formatPrice = function(price){
    let prc;
    if(price!=''){
        prc = price.slice(0,8);
    } else { prc=''; }
    return prc;
}