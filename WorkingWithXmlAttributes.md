# Access to XML attributes #

```
    // Create x2js instance with default config
    var x2js = new X2JS();   

    var xmlText = "<MyOperation myAttr='SuccessAttrValue'>MyText</MyOperation>";
    var jsonObj = x2js.xml_str2json( xmlText );

    // Access to attribute
    console.log(jsonObj.MyOperation._myAttr);

    // Access to text
    console.log(jsonObj.MyOperation.__text);
    // Or
    console.log(jsonObj.MyOperation.toString());
```

# Configure a custom prefix to attributes #

```
	var x2js = new X2JS({
	    attributePrefix : "$"
	});
	
	var xmlText = "<MyOperation myAttr='SuccessAttrValue'>MyText</MyOperation>";

	var jsonObj = x2js.xml_str2json( xmlText );

	// Access to attribute
	console.log(jsonObj.MyOperation.$myAttr);
```