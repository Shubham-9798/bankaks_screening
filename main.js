let submit = document.getElementById("imageForm")
var _URL = window.URL 

var uploadBtn = document.getElementById('u-btn')
var canvas = [];
var canvas1 = document.getElementById("myCanvas1");
var ctx1 = canvas1.getContext("2d");
var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");
canvas.push(canvas1)
canvas.push(canvas2)

function base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}


submit.addEventListener("submit", myScript);

function myScript(e) {
    e.preventDefault();
    let photo= document.querySelector('#photo-input').files[0]


    // var canvasCopy = document.getElementById("copyCanvas");   
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    if(!photo) {
      alert("Empty File")
      return
    }

    if(photo.name.match(/\.(jpg|JPG|jpeg|JPEG|PNG|png)$/)) {
        console.log("image")
        // Make Upload button visible
        uploadBtn.classList.remove('btn-close')    
        

        img = new Image() 
        let objectUrl = _URL.createObjectURL(photo);
        img.src = objectUrl;
        img.onload = async function () {
            // alert(this.width + " " + this.height);
            // _URL.revokeObjectURL(objectUrl);

            canvasCopy.width = this.width;
            canvasCopy.height = this.height;
            copyContext.drawImage(img, 10, 10);

            // Image of resolution n/10 x m/10
            let n = 10;
            canvas1.width = this.width/n;
            canvas1.height = this.height/n;
            ctx1.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas1.width, canvas1.height);

            // Image of resolution n/20 x m/20
            n = n+10
            canvas2.width = this.width/n;
            canvas2.height = this.height/n;
            ctx2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas2.width, canvas2.height);
            

          };

          // for downloading compress image
          canvas.forEach((elem, index) => {
            elem.addEventListener('click', function(e) {
              // for IE/Edge 
              if(window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(elem.msToBlob(), `filename${index}.png`)
              } else {
                var link = document.createElement('a');
                 link.download = `filename${index}.png`;
                 link.href = elem.toDataURL()
                 link.click();
              }
              
            })
          })

    } else {
        console.log("not image")
        alert("Uploaded File Is Not Of Image Type, !JPEG/PNG")
    }
}

function upload() {
  var url = "url/action";    
  var formData = new FormData();   

  canvas.forEach((image, index) => {
    var base64ImageContent = image.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
    var blob = base64ToBlob(base64ImageContent, 'image/png'); 
    // console.log(blob) 
    formData.append('picture'+index, blob);
  }) 

  $.ajax({
      url: url, 
      type: "POST", 
      cache: false,
      cors: true ,
      contentType: false,
      secure: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      processData: false,
      data: formData})
          .done(function(e){
              alert('done!');
          });
}

