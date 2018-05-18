export class X2JSConfig {
  public arrayAccessForm = 'none'
  public emptyNodeForm = 'text'
  public attributeConverters: any[] = []
  public datetimeAccessFormPaths: any[] = []
  public arrayAccessFormPaths: any[] = []
  public enableToStringFunc = true
  public skipEmptyTextNodesForObj = true
  public stripWhitespaces = true
  public useDoubleQuotes = true
  public ignoreRoot = false
  public escapeMode = true
  public attributePrefix = '_'
  public selfClosingElements = true
  public keepCData = false
  public jsDateUTC = false
  public jsAttributeFilter: any
  public jsAttributeConverter: any
}
