# Working with XML DateTime. Configuring it beforehand #
```
    x2js = new X2JS({
        datetimeAccessFormPaths : [
           "MyDts.testds" /* Configure it beforehand */
        ]
    });

    xmlText = "<MyDts>"+
                "<testds>2002-10-10T12:00:00+04:00</testds>"+
        "</MyDts>";
    jsonObj = x2js.xml_str2json( xmlText );
    console.log(jsonObj.MyDts.testds );
```
# Or using the utility function #
```
    x2js = new X2JS();

    xmlText = "<MyDts>"+
                "<testds>2002-10-10T12:00:00+04:00</testds>"+
        "</MyDts>";
    jsonObj = x2js.xml_str2json( xmlText );

    console.log(x2js.asDateTime( jsonObj.MyDts.testds ));
```