# Parsing AJAX XML response (JQuery sample) #
```
$.ajax({
    type: "GET",
    url: "/test",
    dataType: "xml",
    success: function(xmlDoc) {
        var x2js = new X2JS();
        var jsonObj = x2js.xml2json(xmlDoc);
  
    }
});
```

# Loading XML and converting to JSON #

```
    function loadXMLDoc(dname) {
        if (window.XMLHttpRequest) {
            xhttp=new XMLHttpRequest();
        }
        else {
            xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET",dname,false);
        xhttp.send();
        return xhttp.responseXML;
    }


    var xmlDoc = loadXMLDoc("test.xml");
    var x2js = new X2JS();
    var jsonObj = x2js.xml2json(xmlDoc);
```