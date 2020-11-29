# Image_Compression_Bankaks
---
## Description
Usecase of this application is to compress image to given resolution and upload to server.

_**For example**, a user takes an image from their phone which is 4290 x 2800 px in
size. The user taps on the upload button in the mobile application and the image is
reduced to 214.5 x 140 px and 429 x 280 px before uploading all three versions on
the cloud._

## Start Project

### Method-1
- Start project by directly clicking on _index.js_
### Method-1
- **Using Node.js**, install _live-server_ package globally ` npm i -g live-server`
- Run app by `live-server --port = PortNumber`

## Image Compression
Images are compressed to it's lower resolution by using Canvas API. The API provides a means for drawing graphics via JavaScript and the HTML. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing.

### What is used!!
Under CanvasRenderingContext2D interface, I used _drawImage method_. The drawImage() method can also draw parts of an image, and/or increase/reduce the image size.
 ```
 context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height) 
 ```
 - **img** 	: Specifies the image, canvas, or video element to use 	 
 - **sx** : Optional. The x coordinate where to start clipping 	
 - **sy** : Optional. The y coordinate where to start clipping 	
 - **swidth** :	Optional. The width of the clipped image 	
 - **sheight** : Optional. The height of the clipped image 	
 - **x** : The x coordinate where to place the image on the canvas 	
 - **y**	: The y coordinate where to place the image on the canvas 	
 - **width** : Optional. The width of the image to use (stretch or reduce the image) 	
 - **height** :	Optional. The height of the image to use (stretch or reduce the image)

## Sending/Uploading Image
Using `Jquery 3.5` http request compressed image is send to the server. Image send's in form of BLOB instead of base4/image. **Base64 is almost exactly 8/6 times as bulky as binary (BLOB).**

```
$.ajax({
  url: "test.html",
  context: document.body
}).done(function() {
  $( this ).addClass( "done" );
});
```
