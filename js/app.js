
var map;
   var markers =[];
var locations = [
             {title:"Park Ave Penthouse", location:{lat: 40.7713024, lng: -73.9632393}},
             {title:"Chelsa Loft", location:{lat: 40.7444883, lng:-73.9949465}},
             {title:"Union Square Open Floor Plan", location:{lat: 40.7347062, lng: -73.9895759}},
             {title:"TriBeCa Artsy Bachelor Pad", location:{lat: 40.7195264, lng:-74.0089934}},
             {title:"Chinatown Homey Space", location:{lat: 40.7180628, lng: -73.9961237}}
         ];
 
      
/*var locationfuc = function (data){
    var that= this;
         this.titl=data.title;
         this.lat=data.lat;
         this.lng=data.lng;
         this.url="";*/
           
function populateInfowWindow(marker, infowindow){
    var title1 = marker.title;
//get info from third party app as cameron has done it
    var wikiurl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + title1+ "&formate=json&callback=wikiCallBack";
      var wikiRequestTimeout = setTimeout(function(){
          $wikiElem.text("failed to get resources");
      },8000) ;     
  $.ajax({
      URL:wikiurl,
                 dataType:"jsonp",
                 success: function( response ){
                marker.url= URL;
                 clearTimeout(wikiRequestTimeout);
                 }
                 });
             //check that the window isn't already opened
             if(infowindow.marker != marker){
                 infowindow.marker = marker;
                 infowindow.setContent("<div>" + title1 + wikiurl + "</div>");
                 infowindow.open(map, marker);
                 //make sure the marker property is cleared 
                 infowindow.addListener("closeclick", function(){
                     infowindow.marker = null;
                 });
             }
    //to animate the markeri have learned this fromhttps://developers.google.com/maps/documentation/javascript/examples/marker-animations
    function toggleBounce(){
        if(marker.getAnimation() !== null){
            marker.setAnimation(null);
            }else{
                marker.setAnimation(google.maps.Animation.bounce);
            }
    }marker.addListener("click", toggleBounce());
              } 

function initMap(){
   // var that =this;
    //this.locationslist = ko.observableArray([]);
     
           map = new google.maps.Map(document.getElementById("map"),{
    center:{lat:40.7413549, lng:-73.99802439999996},
             zoom: 13
         }); 
    //locations.forEach(function(element){
      // self.locationslist.push(new locationfuc(element));
    
 var largeInfowwindow = new google.maps.InfoWindow();
         var bounds = new google.maps.LatLngBounds();
         //markers loop through the locations
         for (var i=0; i<locations.length; i++){
             //get pos. from array locations
             var position = locations[i].location;
             var title = locations[i].title;
             //create a marker per location, put into markers array
             var marker = new google.maps.Marker({
                 map: map,
                 position: position,
                 title: title,
                 animation: google.maps.Animation.DROP,
                 id: i
              });
             //push it to the markers array
             markers.push(markers);
             //extend the boundaries of the map to each marker
             bounds.extend(marker.position);
             //creat on click event to open infowindow
             marker.addListener("click", loop());
              }
              var loop = fuction(){
               return function(){
                 populateInfowWindow(this, largeInfowwindow);
               };
                              }
     
         //info function will populate the window when the marker is clicked
         function populateInfowWindow(marker, infowindow){
             //check that the window isn't already opened
             if(infowindow.marker != marker){
                 infowindow.marker = marker;
                 infowindow.setContent("<div>" + marker.title + "</div>");
                 infowindow.open(map, marker);
                 //make sure the marker property is cleared 
                 infowindow.addListener("closeclick", function(){
                     infowindow.marker = null;
                 });
             }
         }
        
        map.fitBounds(bounds);
        }
     viewModel.locations()[i].marker = marker;
 //declare a listener which toggle bounce when clicked             
marker.addListener("click",toggleBounce());


    var largeInfowwindow = new google.maps.InfoWindow();
//i have gone through the course  and livehelp and forums and webcasts  //alot to be able to do this part thanks mr karol and our coaches i hope //i get it right
var viewModel = function (){
    var that = this;
  that.markers = ko.observableArray([]);
    that.map =map;
    that.locations= ko.observableArray(locations);
    that.filter = ko.observable(" ");
    //with the help of life help
    that.filteredArray = ko.bservableArray([]);
    that.filteredArray= ko.computed(function(){
    //clarify the functions to filter the text 
    return ko.utils.arrayFilter(that.locations(), function(elem){
        //is there text or not
        if(elem.title.toLowerCase().indexOf(that.filter().toLowerCase()) !==-1){
            //if itis true > if found 
            //learned through searching the forums
            if(elem.marker)
                elem.marker.setVisible(false);
        }else  {
            elem.marker.setVisible(false);
        }
        return elem.title.toLowerCase().indexof(that.filter().toLowerCase()) !==-1;
    });},self);
    that.clickHandler= function (locations) {
        google.maps.event.trigger(locations.marker, "click");
    };
    
    
    
    };
    

    ko.applyBindings(new viewModel());
//i had inspiration from this duscussion forum https://discussions.udacity.com/t/neighborhood-map-help/317829/17
//i alse used the code in the course an tried to keep following it