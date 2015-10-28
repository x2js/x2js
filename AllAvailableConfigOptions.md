# X2JS instance config options #

```
// Available options
    var x2jsOptionsSample = new X2JS({
        // Escaping XML characters. Default is true from v1.1.0+
        escapeMode : true,                              
        // XML attributes prefix. Default is "_"
        attributePrefix : "_",
        // Array access form (none|property). Use property if you want X2JS generate additional property <element>_asArray to access in array form any element
        // Default is none from v1.1.0+
        arrayAccessForm : "none",
        // Handling empty nodes (text|object). 
        // When X2JS found empty node like <test></test> it will be transformed to test : '' for 'text' mode, 
        // or to Object for 'object' mode  
        // Default is 'text'
        emptyNodeForm  : "text",

        // Enable/Disable auxiliary function in generated JSON object to print text nodes with __text/__cdata
        // Default is true
        enableToStringFunc : true,
        
        // Array access paths (array). 
        // Use this option to configure paths to XML elements always in "array form". 
        // You can configure beforehand paths to all your array elements based on XSD or your knowledge
        // about XML structure
        // Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*\.child2/), or a custom function
        arrayAccessFormPaths : [],

        // Skip empty text tags for nodes with children
        skipEmptyTextNodesForObj : true,

        // Strip whitespaces (trimming text nodes)
        stripWhitespaces : true,

        // DateTime access paths (array). 
        // Use this option to configure paths to XML elements for "datetimes form". 
        // You can configure beforehand paths to all your array elements based on XSD or your knowledge
        // about XML structure
        // Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*\.child2/), or a custom function
        // Default is empty array
        datetimeAccessFormPaths : []
    });
```