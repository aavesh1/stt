var btn = document.getElementById('btn')

btn.addEventListener('click' , function(){
    
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 ){
        
        console.log(XHR.responseText)}
    }
    XHR.open('get', 'http://localhost:3002/aavesh/datalist')
    XHR.send()
})