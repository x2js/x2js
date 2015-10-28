# Parse XML with namespaces #
```
    var xmlText = "<testns:MyOperation xmlns:testns='http://www.example.org'>"+
"<test>Success</test><test2 myAttr='SuccessAttrValueTest2'><item>ddsfg</item><item>dsdgfdgfd</item><item2>testArrSize</item2></test2></testns:MyOperation>";

    var jsonObj = x2js.xml_str2json( xmlText );
    console.log(jsonObj.MyOperation.test);
```

# Create XML with namespaces. Option #1 #
```
    var testObjC = {
            'm:TestAttrRoot' : {
                '_tns:m' : 'http://www.example.org',
                '_tns:cms' : 'http://www.example.org',
                MyChild : 'my_child_value',
                'cms:MyAnotherChild' : 'vdfd'
            }
    }
```

# Create XML with namespaces. Option #2 #
```
    // Parse JSON object constructed with another NS-style
    var testObjNew = {
            TestAttrRoot : {
                __prefix : 'm',
                '_tns:m' : 'http://www.example.org',
                '_tns:cms' : 'http://www.example.org',
                MyChild : 'my_child_value',
                MyAnotherChild : {
                        __prefix : 'cms',
                        __text : 'vdfd'
                }
            }
    }
    
    // Parse JSON object with namespaces
    var xmlDocStr = x2js.json2xml_str(
        testObjNew
    );

```