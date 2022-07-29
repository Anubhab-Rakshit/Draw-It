 
const c = document.querySelector('#canvas-section')
const tool = document.getElementById('upper-menu')
const ct = c.getContext('2d')
const cX = window.innerWidth
const cY = window.innerHeight
c.height=cY
c.width=cX
c.fillStyle="white"
window.html2canvas= html2canvas
window.jsPDF=window.jspdf.jsPDF
let isP = false
let l_width = 5
let s_x
let is_e=false
let s_y
let skeep
let restore_data=[]
var md=document.getElementById('mode');
var options = md.options[md.selectedIndex];
let md_val=options.text;
let i=-1
ct.lineWidth=l_width
ct.strokeStyle="#ff0000"
document.getElementById('custom-color').style.fill="#ff0000"
tool.addEventListener('click' , f => {
    if(f.target.id == 'clear'){
        ct.clearRect(0,0,c.width,c.height)
    }    
})
tool.addEventListener('change' , e => {
    if(e.target.id == 'stroke'){
        ct.strokeStyle = e.target.value
        skeep=e.target.value
        document.getElementById('custom-color').style.fill=e.target.value

    }
    if(e.target.id == 'width'){
        l_width=e.target.value
    }
})
function pen(){
function draw(e){
    if(!isP){
        return
    }
    ct.strokeStyle=skeep
    ct.lineWidth=l_width
    ct.lineCap="round"
    ct.lineTo(e.clientX,e.clientY)
    ct.stroke()
    
    ct.moveTo(e.clientX , e.clientY)
    s_x=e.clientX
    s_y=e.clientY
}
c.addEventListener('mousedown' , (e) => {
    isP=true
    s_x=e.clientX
    s_y=e.clientY
})
c.addEventListener('mouseup', e => {
    isP=false
    ct.closePath()
    if(e.type1= 'mouseout'){
        restore_data.push(ct.getImageData(0,0,c.width,c.height))
        i=i+1
    }
    ct.beginPath()
})
c.addEventListener('mousemove', draw)
}
function width_increase(){
    let x = document.getElementById('width').value
    a=parseInt(x)
    x=a+1
    document.getElementById('width').value=x
}
function width_decrease(){
    if (document.getElementById('width').value=='1'){
        alert("That's the minimum pen width")
        document.getElementById('width').value=1
    }
    else{
    let x = document.getElementById('width').value
    a=parseInt(x)
    x=x-1
    document.getElementById('width').value=x
    }
}
function makepdf()
{ 
    var pdf = new jsPDF();
    var width = pdf.internal.pageSize.getWidth();
var height = pdf.internal.pageSize.getHeight();
  var imgData = c.toDataURL("image/jpeg", 1.0);
     pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
     name_of_file=prompt("Please enter the name of your pdf which should be saved. Type Q to save it with a default name")
     if(name_of_file==null){
        alert("Please enter a valid name")
     }
     else if(name_of_file="Q"){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        saving_name="drawing_"+today
        pdf.save(saving_name);
     }
     else if((name_of_file!=null) && (name_of_file!="Q")){
        pdf.save(name_of_file);
     }
     
 }
download_image=function() {
 var img=c.toDataURL("image/jpeg")
 window.location.href=img
   const createEl = document.createElement('a');
   createEl.href = img;
   name_of_image=prompt("Enter the name of the image . Press Q to save it with default name")
   name_of_image=name_of_image.toUpperCase()
   if(name_of_image==null){
    alert("Please enter a valid name")
    }
    else if(name_of_file="Q"){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    saving_name="drawing_"+today
    createEl.download = saving_name;
     }
    else if((name_of_image!=null) && (name_of_image!="Q")){
        createEl.download = saving_name;
     }
   createEl.click();
   createEl.remove();
}
function eraser(){
  
     c.addEventListener('mousemove' , erase)
      function erase(e){
        if(!is_e){
            return
        }
    
        ct.strokeStyle="white"
    
        ct.lineWidth=20
        ct.lineCap="round"
        ct.lineTo(e.clientX,e.clientY)
        ct.stroke()
        ct.moveTo(e.clientX,e.clientY)
      }
     c.addEventListener('mouseup' , (e) => {
        is_e=false
        ct.closePath()

     })
     c.addEventListener('mousedown' , (e) => {
        is_e=true
     })
    
}
function undo(){
    if(i<=0){
        ct.clearRect(0,0,c.width,c.height)
    }
    else{
        i=i-1
        restore_data.pop()
        ct.putImageData(restore_data[i],0,0)
    }
}