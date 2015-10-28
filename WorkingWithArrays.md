# Configure XML structure knowledge beforehand #

```
var x2js = new X2JS({
    	arrayAccessFormPaths : [
	   "MyArrays.test.item"
    	]
    });


var xmlText = "<MyArrays>"+
    		"<test><item>success</item><item>second</item></test>"+
    	"</MyArrays>";
    
    	
var jsonObj = x2js.xml_str2json( xmlText );
    console.log(jsonObj.MyArrays.test2.item[0]);

```

# Or use the utility function #
```
var x2js = new X2JS();
var xmlText = "<MyArrays>"+
    		"<test><item>success</item><item>second</item></test>"+
    	"</MyArrays>";

var jsonObj = x2js.xml_str2json( xmlText );
    console.log(x2js.asArray(jsonObj.MyArrays.test.item)[0]);

```